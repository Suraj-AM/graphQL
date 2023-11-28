import { Document } from 'mongoose';

const deleteAtPath = (obj: Record<string, any>, path: string[], index: number): void => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  deleteAtPath(obj[path[index]], path, index + 1);
};

const privatePlugin = (schema: any): void => {
  let transform: ((doc: Document, ret: Record<string, any>, options: any) => void) | undefined;

  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform as (doc: Document, ret: Record<string, any>, options: any) => void;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc: Document, ret: Record<string, any>, options: any): void {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          deleteAtPath(ret, path.split('.'), 0);
        }
      });

      delete ret.__v;

      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
};

export default privatePlugin;
