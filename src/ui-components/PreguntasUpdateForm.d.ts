/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Preguntas } from "../models";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PreguntasUpdateFormInputValues = {
    motivacion?: number;
    relajacion?: number;
    satisfacion?: number;
    aprendizaje?: number;
    estres?: number;
    ayuda?: number;
    seguridad?: number;
    actividadFisica?: number;
    amistadFamilia?: number;
    gratitud?: number;
    pasatiempos?: number;
    inspitacion?: number;
    reflexion?: number;
    comunicacion?: number;
    creatividad?: number;
};
export declare type PreguntasUpdateFormValidationValues = {
    motivacion?: ValidationFunction<number>;
    relajacion?: ValidationFunction<number>;
    satisfacion?: ValidationFunction<number>;
    aprendizaje?: ValidationFunction<number>;
    estres?: ValidationFunction<number>;
    ayuda?: ValidationFunction<number>;
    seguridad?: ValidationFunction<number>;
    actividadFisica?: ValidationFunction<number>;
    amistadFamilia?: ValidationFunction<number>;
    gratitud?: ValidationFunction<number>;
    pasatiempos?: ValidationFunction<number>;
    inspitacion?: ValidationFunction<number>;
    reflexion?: ValidationFunction<number>;
    comunicacion?: ValidationFunction<number>;
    creatividad?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PreguntasUpdateFormOverridesProps = {
    PreguntasUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    motivacion?: PrimitiveOverrideProps<TextFieldProps>;
    relajacion?: PrimitiveOverrideProps<TextFieldProps>;
    satisfacion?: PrimitiveOverrideProps<TextFieldProps>;
    aprendizaje?: PrimitiveOverrideProps<TextFieldProps>;
    estres?: PrimitiveOverrideProps<TextFieldProps>;
    ayuda?: PrimitiveOverrideProps<TextFieldProps>;
    seguridad?: PrimitiveOverrideProps<TextFieldProps>;
    actividadFisica?: PrimitiveOverrideProps<TextFieldProps>;
    amistadFamilia?: PrimitiveOverrideProps<TextFieldProps>;
    gratitud?: PrimitiveOverrideProps<TextFieldProps>;
    pasatiempos?: PrimitiveOverrideProps<TextFieldProps>;
    inspitacion?: PrimitiveOverrideProps<TextFieldProps>;
    reflexion?: PrimitiveOverrideProps<TextFieldProps>;
    comunicacion?: PrimitiveOverrideProps<TextFieldProps>;
    creatividad?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PreguntasUpdateFormProps = React.PropsWithChildren<{
    overrides?: PreguntasUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    preguntas?: Preguntas;
    onSubmit?: (fields: PreguntasUpdateFormInputValues) => PreguntasUpdateFormInputValues;
    onSuccess?: (fields: PreguntasUpdateFormInputValues) => void;
    onError?: (fields: PreguntasUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PreguntasUpdateFormInputValues) => PreguntasUpdateFormInputValues;
    onValidate?: PreguntasUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PreguntasUpdateForm(props: PreguntasUpdateFormProps): React.ReactElement;
