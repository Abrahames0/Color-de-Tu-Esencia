// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Preguntas } = initSchema(schema);

export {
  Preguntas
};