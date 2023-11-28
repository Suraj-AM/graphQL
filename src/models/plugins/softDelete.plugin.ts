import { Schema } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const softDelete = (schema: Schema) => {
  schema.plugin(mongooseDelete, { overrideMethods: ['count', 'countDocuments', 'find'] });
};

export default softDelete;
