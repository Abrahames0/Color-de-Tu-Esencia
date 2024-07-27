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
export declare type ModelosCreateFormInputValues = {
    Modelurl?: string;
};
export declare type ModelosCreateFormValidationValues = {
    Modelurl?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ModelosCreateFormOverridesProps = {
    ModelosCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Modelurl?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ModelosCreateFormProps = React.PropsWithChildren<{
    overrides?: ModelosCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ModelosCreateFormInputValues) => ModelosCreateFormInputValues;
    onSuccess?: (fields: ModelosCreateFormInputValues) => void;
    onError?: (fields: ModelosCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ModelosCreateFormInputValues) => ModelosCreateFormInputValues;
    onValidate?: ModelosCreateFormValidationValues;
} & React.CSSProperties>;
export default function ModelosCreateForm(props: ModelosCreateFormProps): React.ReactElement;
