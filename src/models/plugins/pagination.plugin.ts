import { Model, Document } from 'mongoose';

interface PaginateOptions {
  sortBy?: string;
  limit?: number;
  page?: number;
  populate?: string[];
}

interface PaginateResult<T> {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

const paginate = <T extends Document>(schema: Model<T> & Record<string, any>): void => {
  schema.statics.paginate = async function (
    filter: Record<string, any>,
    options: PaginateOptions
  ): Promise<PaginateResult<T>> {
    let sort = "";
    if (options.sortBy) {
      const sortingCriteria: string[] = [];
      options.sortBy.split(",").forEach((sortOption) => {
        const [key, order] = sortOption.split(":");
        sortingCriteria.push((order === "desc" ? "-" : "") + key);
      });

      sort = sortingCriteria.join(" ");
    } else {
      sort = "-createdAt";
    }

    const limit: number = options.limit && parseInt(options.limit.toString(), 10) > 0 ? parseInt(options.limit.toString(), 10) : 10;
    const page: number = options.page && parseInt(options.page.toString(), 10) > 0 ? parseInt(options.page.toString(), 10) : 1;
    const skip: number = (page - 1) * limit;

    const countPromise: Promise<number> = this.countDocuments(filter).exec();
    let docsPromise: any = this.find(filter).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit);

    if (options.populate && options.populate.length) {
      options.populate.forEach((populateOption) => {
        docsPromise = docsPromise.populate(populateOption);
      });
    }

    docsPromise = docsPromise.exec();

    const [totalResults, results] = await Promise.all([countPromise, docsPromise]);

    const totalPages: number = Math.ceil(totalResults / limit);
    const result: PaginateResult<T> = {
      results,
      page,
      limit,
      totalPages,
      totalResults,
    };
    return result;
  };
};

export default paginate;
