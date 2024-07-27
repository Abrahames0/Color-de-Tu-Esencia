/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { Modelos } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function ModelosUpdateForm(props) {
  const {
    id: idProp,
    modelos: modelosModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Modelurl: "",
  };
  const [Modelurl, setModelurl] = React.useState(initialValues.Modelurl);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = modelosRecord
      ? { ...initialValues, ...modelosRecord }
      : initialValues;
    setModelurl(cleanValues.Modelurl);
    setErrors({});
  };
  const [modelosRecord, setModelosRecord] = React.useState(modelosModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Modelos, idProp)
        : modelosModelProp;
      setModelosRecord(record);
    };
    queryData();
  }, [idProp, modelosModelProp]);
  React.useEffect(resetStateValues, [modelosRecord]);
  const validations = {
    Modelurl: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Modelurl,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            Modelos.copyOf(modelosRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ModelosUpdateForm")}
      {...rest}
    >
      <TextField
        label="Modelurl"
        isRequired={false}
        isReadOnly={false}
        value={Modelurl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Modelurl: value,
            };
            const result = onChange(modelFields);
            value = result?.Modelurl ?? value;
          }
          if (errors.Modelurl?.hasError) {
            runValidationTasks("Modelurl", value);
          }
          setModelurl(value);
        }}
        onBlur={() => runValidationTasks("Modelurl", Modelurl)}
        errorMessage={errors.Modelurl?.errorMessage}
        hasError={errors.Modelurl?.hasError}
        {...getOverrideProps(overrides, "Modelurl")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || modelosModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || modelosModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
