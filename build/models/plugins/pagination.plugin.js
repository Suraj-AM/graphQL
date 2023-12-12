"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginate = (schema) => {
    schema.statics.paginate = function (filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let sort = "";
            if (options.sortBy) {
                const sortingCriteria = [];
                options.sortBy.split(",").forEach((sortOption) => {
                    const [key, order] = sortOption.split(":");
                    sortingCriteria.push((order === "desc" ? "-" : "") + key);
                });
                sort = sortingCriteria.join(" ");
            }
            else {
                sort = "-createdAt";
            }
            const limit = options.limit && parseInt(options.limit.toString(), 10) > 0 ? parseInt(options.limit.toString(), 10) : 10;
            const page = options.page && parseInt(options.page.toString(), 10) > 0 ? parseInt(options.page.toString(), 10) : 1;
            const skip = (page - 1) * limit;
            const countPromise = this.countDocuments(filter).exec();
            let docsPromise = this.find(filter).collation({ locale: "en" }).sort(sort).skip(skip).limit(limit);
            if (options.populate && options.populate.length) {
                options.populate.forEach((populateOption) => {
                    docsPromise = docsPromise.populate(populateOption);
                });
            }
            docsPromise = docsPromise.exec();
            const [totalResults, results] = yield Promise.all([countPromise, docsPromise]);
            const totalPages = Math.ceil(totalResults / limit);
            const result = {
                results,
                page,
                limit,
                totalPages,
                totalResults,
            };
            return result;
        });
    };
};
exports.default = paginate;
