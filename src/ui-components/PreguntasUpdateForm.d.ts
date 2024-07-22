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
    pregunta1?: string;
};
export declare type PreguntasUpdateFormValidationValues = {
    pregunta1?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PreguntasUpdateFormOverridesProps = {
    PreguntasUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    pregunta1?: PrimitiveOverrideProps<TextFieldProps>;
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
