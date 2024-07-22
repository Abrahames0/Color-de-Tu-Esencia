/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { Preguntas } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function PreguntasUpdateForm(props) {
  const {
    id: idProp,
    preguntas: preguntasModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    pregunta1: "",
  };
  const [pregunta1, setPregunta1] = React.useState(initialValues.pregunta1);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = preguntasRecord
      ? { ...initialValues, ...preguntasRecord }
      : initialValues;
    setPregunta1(cleanValues.pregunta1);
    setErrors({});
  };
  const [preguntasRecord, setPreguntasRecord] =
    React.useState(preguntasModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Preguntas, idProp)
        : preguntasModelProp;
      setPreguntasRecord(record);
    };
    queryData();
  }, [idProp, preguntasModelProp]);
  React.useEffect(resetStateValues, [preguntasRecord]);
  const validations = {
    pregunta1: [],
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
          pregunta1,
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
            Preguntas.copyOf(preguntasRecord, (updated) => {
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
      {...getOverrideProps(overrides, "PreguntasUpdateForm")}
      {...rest}
    >
      <TextField
        label="Pregunta1"
        isRequired={false}
        isReadOnly={false}
        value={pregunta1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              pregunta1: value,
            };
            const result = onChange(modelFields);
            value = result?.pregunta1 ?? value;
          }
          if (errors.pregunta1?.hasError) {
            runValidationTasks("pregunta1", value);
          }
          setPregunta1(value);
        }}
        onBlur={() => runValidationTasks("pregunta1", pregunta1)}
        errorMessage={errors.pregunta1?.errorMessage}
        hasError={errors.pregunta1?.hasError}
        {...getOverrideProps(overrides, "pregunta1")}
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
          isDisabled={!(idProp || preguntasModelProp)}
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
              !(idProp || preguntasModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
