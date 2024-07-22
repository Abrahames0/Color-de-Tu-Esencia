import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerPreguntas = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Preguntas, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly motivacion?: number | null;
  readonly relajacion?: number | null;
  readonly satisfacion?: number | null;
  readonly aprendizaje?: number | null;
  readonly estres?: number | null;
  readonly ayuda?: number | null;
  readonly seguridad?: number | null;
  readonly actividadFisica?: number | null;
  readonly amistadFamilia?: number | null;
  readonly gratitud?: number | null;
  readonly pasatiempos?: number | null;
  readonly inspitacion?: number | null;
  readonly reflexion?: number | null;
  readonly comunicacion?: number | null;
  readonly creatividad?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPreguntas = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Preguntas, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly motivacion?: number | null;
  readonly relajacion?: number | null;
  readonly satisfacion?: number | null;
  readonly aprendizaje?: number | null;
  readonly estres?: number | null;
  readonly ayuda?: number | null;
  readonly seguridad?: number | null;
  readonly actividadFisica?: number | null;
  readonly amistadFamilia?: number | null;
  readonly gratitud?: number | null;
  readonly pasatiempos?: number | null;
  readonly inspitacion?: number | null;
  readonly reflexion?: number | null;
  readonly comunicacion?: number | null;
  readonly creatividad?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Preguntas = LazyLoading extends LazyLoadingDisabled ? EagerPreguntas : LazyPreguntas

export declare const Preguntas: (new (init: ModelInit<Preguntas>) => Preguntas) & {
  copyOf(source: Preguntas, mutator: (draft: MutableModel<Preguntas>) => MutableModel<Preguntas> | void): Preguntas;
}