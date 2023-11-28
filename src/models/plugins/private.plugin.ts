import { Schema, Document, Model } from 'mongoose';

interface PrivateOptions {
  private?: boolean;
}

const deleteAtPath = (obj: any, path: string[], index: number): void => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  deleteAtPath(obj[path[index]], path, index + 1);
};

const privatePlugin = <T extends Document>(
  schema: Schema<T, Model<T>, {}>
): void => {
  schema.set('toJSON', {
    transform: function (doc, ret) {
      const schemaPaths = Object.keys(schema.paths);

      schemaPaths.forEach((path) => {
        const schemaType = schema.path(path);
        const schemaOptions = schemaType.options as PrivateOptions;

        if (schemaOptions && schemaOptions.private) {
          deleteAtPath(ret, path.split('.'), 0);
        }
      });

      delete ret.__v;
      return ret;
    },
  });
};

export default privatePlugin;
