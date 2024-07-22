/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type PreguntasCreateFormInputValues = {
    pregunta1?: string;
};
export declare type PreguntasCreateFormValidationValues = {
    pregunta1?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PreguntasCreateFormOverridesProps = {
    PreguntasCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    pregunta1?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PreguntasCreateFormProps = React.PropsWithChildren<{
    overrides?: PreguntasCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PreguntasCreateFormInputValues) => PreguntasCreateFormInputValues;
    onSuccess?: (fields: PreguntasCreateFormInputValues) => void;
    onError?: (fields: PreguntasCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PreguntasCreateFormInputValues) => PreguntasCreateFormInputValues;
    onValidate?: PreguntasCreateFormValidationValues;
} & React.CSSProperties>;
export default function PreguntasCreateForm(props: PreguntasCreateFormProps): React.ReactElement;
