/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Modelos } from "../models";
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
export declare type ModelosUpdateFormInputValues = {
    Modelurl?: string;
};
export declare type ModelosUpdateFormValidationValues = {
    Modelurl?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ModelosUpdateFormOverridesProps = {
    ModelosUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Modelurl?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ModelosUpdateFormProps = React.PropsWithChildren<{
    overrides?: ModelosUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    modelos?: Modelos;
    onSubmit?: (fields: ModelosUpdateFormInputValues) => ModelosUpdateFormInputValues;
    onSuccess?: (fields: ModelosUpdateFormInputValues) => void;
    onError?: (fields: ModelosUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ModelosUpdateFormInputValues) => ModelosUpdateFormInputValues;
    onValidate?: ModelosUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ModelosUpdateForm(props: ModelosUpdateFormProps): React.ReactElement;
