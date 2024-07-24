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
    motivacion: "",
    relajacion: "",
    satisfaccion: "",
    aprendizaje: "",
    estres: "",
    ayuda: "",
    seguridad: "",
    actividadFisica: "",
    amistadFamilia: "",
    gratitud: "",
    pasatiempos: "",
    inspiracion: "",
    reflexion: "",
    comunicacion: "",
    creatividad: "",
  };
  const [motivacion, setMotivacion] = React.useState(initialValues.motivacion);
  const [relajacion, setRelajacion] = React.useState(initialValues.relajacion);
  const [satisfaccion, setSatisfaccion] = React.useState(
    initialValues.satisfaccion
  );
  const [aprendizaje, setAprendizaje] = React.useState(
    initialValues.aprendizaje
  );
  const [estres, setEstres] = React.useState(initialValues.estres);
  const [ayuda, setAyuda] = React.useState(initialValues.ayuda);
  const [seguridad, setSeguridad] = React.useState(initialValues.seguridad);
  const [actividadFisica, setActividadFisica] = React.useState(
    initialValues.actividadFisica
  );
  const [amistadFamilia, setAmistadFamilia] = React.useState(
    initialValues.amistadFamilia
  );
  const [gratitud, setGratitud] = React.useState(initialValues.gratitud);
  const [pasatiempos, setPasatiempos] = React.useState(
    initialValues.pasatiempos
  );
  const [inspiracion, setInspiracion] = React.useState(
    initialValues.inspiracion
  );
  const [reflexion, setReflexion] = React.useState(initialValues.reflexion);
  const [comunicacion, setComunicacion] = React.useState(
    initialValues.comunicacion
  );
  const [creatividad, setCreatividad] = React.useState(
    initialValues.creatividad
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = preguntasRecord
      ? { ...initialValues, ...preguntasRecord }
      : initialValues;
    setMotivacion(cleanValues.motivacion);
    setRelajacion(cleanValues.relajacion);
    setSatisfaccion(cleanValues.satisfaccion);
    setAprendizaje(cleanValues.aprendizaje);
    setEstres(cleanValues.estres);
    setAyuda(cleanValues.ayuda);
    setSeguridad(cleanValues.seguridad);
    setActividadFisica(cleanValues.actividadFisica);
    setAmistadFamilia(cleanValues.amistadFamilia);
    setGratitud(cleanValues.gratitud);
    setPasatiempos(cleanValues.pasatiempos);
    setInspiracion(cleanValues.inspiracion);
    setReflexion(cleanValues.reflexion);
    setComunicacion(cleanValues.comunicacion);
    setCreatividad(cleanValues.creatividad);
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
    motivacion: [],
    relajacion: [],
    satisfaccion: [],
    aprendizaje: [],
    estres: [],
    ayuda: [],
    seguridad: [],
    actividadFisica: [],
    amistadFamilia: [],
    gratitud: [],
    pasatiempos: [],
    inspiracion: [],
    reflexion: [],
    comunicacion: [],
    creatividad: [],
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
          motivacion,
          relajacion,
          satisfaccion,
          aprendizaje,
          estres,
          ayuda,
          seguridad,
          actividadFisica,
          amistadFamilia,
          gratitud,
          pasatiempos,
          inspiracion,
          reflexion,
          comunicacion,
          creatividad,
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
        label="Motivacion"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={motivacion}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion: value,
              relajacion,
              satisfaccion,
              aprendizaje,
              estres,
              ayuda,
              seguridad,
              actividadFisica,
              amistadFamilia,
              gratitud,
              pasatiempos,
              inspiracion,
              reflexion,
              comunicacion,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.motivacion ?? value;
          }
          if (errors.motivacion?.hasError) {
            runValidationTasks("motivacion", value);
          }
          setMotivacion(value);
        }}
        onBlur={() => runValidationTasks("motivacion", motivacion)}
        errorMessage={errors.motivacion?.errorMessage}
        hasError={errors.motivacion?.hasError}
        {...getOverrideProps(overrides, "motivacion")}
      ></TextField>
      <TextField
        label="Relajacion"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={relajacion}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion: value,
              satisfaccion,
              aprendizaje,
              estres,
              ayuda,
              seguridad,
              actividadFisica,
              amistadFamilia,
              gratitud,
              pasatiempos,
              inspiracion,
              reflexion,
              comunicacion,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.relajacion ?? value;
          }
          if (errors.relajacion?.hasError) {
            runValidationTasks("relajacion", value);
          }
          setRelajacion(value);
        }}
        onBlur={() => runValidationTasks("relajacion", relajacion)}
        errorMessage={errors.relajacion?.errorMessage}
        hasError={errors.relajacion?.hasError}
        {...getOverrideProps(overrides, "relajacion")}
      ></TextField>
      <TextField
        label="Satisfaccion"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={satisfaccion}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion,
              satisfaccion: value,
              aprendizaje,
              estres,
              ayuda,
              seguridad,
              actividadFisica,
              amistadFamilia,
              gratitud,
              pasatiempos,
              inspiracion,
              reflexion,
              comunicacion,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.satisfaccion ?? value;
          }
          if (errors.satisfaccion?.hasError) {
            runValidationTasks("satisfaccion", value);
          }
          setSatisfaccion(value);
        }}
        onBlur={() => runValidationTasks("satisfaccion", satisfaccion)}
        errorMessage={errors.satisfaccion?.errorMessage}
        hasError={errors.satisfaccion?.hasError}
        {...getOverrideProps(overrides, "satisfaccion")}
      ></TextField>
      <TextField
        label="Aprendizaje"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={aprendizaje}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion,
              satisfaccion,
              aprendizaje: value,
              estres,
              ayuda,
              seguridad,
              actividadFisica,
              amistadFamilia,
              gratitud,
              pasatiempos,
              inspiracion,
              reflexion,
              comunicacion,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.aprendizaje ?? value;
          }
          if (errors.aprendizaje?.hasError) {
            runValidationTasks("aprendizaje", value);
          }
          setAprendizaje(value);
        }}
        onBlur={() => runValidationTasks("aprendizaje", aprendizaje)}
        errorMessage={errors.aprendizaje?.errorMessage}
        hasError={errors.aprendizaje?.hasError}
        {...getOverrideProps(overrides, "aprendizaje")}
      ></TextField>
      <TextField
        label="Estres"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={estres}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion,
              satisfaccion,
              aprendizaje,
              estres: value,
              ayuda,
              seguridad,
              actividadFisica,
              amistadFamilia,
              gratitud,
              pasatiempos,
              inspiracion,
              reflexion,
              comunicacion,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.estres ?? value;
          }
          if (errors.estres?.hasError) {
            runValidationTasks("estres", value);
          }
          setEstres(value);
        }}
        onBlur={() => runValidationTasks("estres", estres)}
        errorMessage={errors.estres?.errorMessage}
        hasError={errors.estres?.hasError}
        {...getOverrideProps(overrides, "estres")}
      ></TextField>
      <TextField
        label="Ayuda"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={ayuda}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion,
              satisfaccion,
              aprendizaje,
              estres,
              ayuda: value,
              seguridad,
              actividadFisica,
              amistadFamilia,
              gratitud,
              pasatiempos,
              inspiracion,
              reflexion,
              comunicacion,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.ayuda ?? value;
          }
          if (errors.ayuda?.hasError) {
            runValidationTasks("ayuda", value);
          }
          setAyuda(value);
        }}
        onBlur={() => runValidationTasks("ayuda", ayuda)}
        errorMessage={errors.ayuda?.errorMessage}
        hasError={errors.ayuda?.hasError}
        {...getOverrideProps(overrides, "ayuda")}
      ></TextField>
      <TextField
        label="Seguridad"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={seguridad}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion,
              satisfaccion,
              aprendizaje,
              estres,
              ayuda,
              seguridad: value,
              actividadFisica,
              amistadFamilia,
              gratitud,
              pasatiempos,
              inspiracion,
              reflexion,
              comunicacion,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.seguridad ?? value;
          }
          if (errors.seguridad?.hasError) {
            runValidationTasks("seguridad", value);
          }
          setSeguridad(value);
        }}
        onBlur={() => runValidationTasks("seguridad", seguridad)}
        errorMessage={errors.seguridad?.errorMessage}
        hasError={errors.seguridad?.hasError}
        {...getOverrideProps(overrides, "seguridad")}
      ></TextField>
      <TextField
        label="Actividad fisica"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={actividadFisica}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion,
              satisfaccion,
              aprendizaje,
              estres,
              ayuda,
              seguridad,
              actividadFisica: value,
              amistadFamilia,
              gratitud,
              pasatiempos,
              inspiracion,
              reflexion,
              comunicacion,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.actividadFisica ?? value;
          }
          if (errors.actividadFisica?.hasError) {
            runValidationTasks("actividadFisica", value);
          }
          setActividadFisica(value);
        }}
        onBlur={() => runValidationTasks("actividadFisica", actividadFisica)}
        errorMessage={errors.actividadFisica?.errorMessage}
        hasError={errors.actividadFisica?.hasError}
        {...getOverrideProps(overrides, "actividadFisica")}
      ></TextField>
      <TextField
        label="Amistad familia"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={amistadFamilia}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion,
              satisfaccion,
              aprendizaje,
              estres,
              ayuda,
              seguridad,
              actividadFisica,
              amistadFamilia: value,
              gratitud,
              pasatiempos,
              inspiracion,
              reflexion,
              comunicacion,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.amistadFamilia ?? value;
          }
          if (errors.amistadFamilia?.hasError) {
            runValidationTasks("amistadFamilia", value);
          }
          setAmistadFamilia(value);
        }}
        onBlur={() => runValidationTasks("amistadFamilia", amistadFamilia)}
        errorMessage={errors.amistadFamilia?.errorMessage}
        hasError={errors.amistadFamilia?.hasError}
        {...getOverrideProps(overrides, "amistadFamilia")}
      ></TextField>
      <TextField
        label="Gratitud"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={gratitud}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion,
              satisfaccion,
              aprendizaje,
              estres,
              ayuda,
              seguridad,
              actividadFisica,
              amistadFamilia,
              gratitud: value,
              pasatiempos,
              inspiracion,
              reflexion,
              comunicacion,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.gratitud ?? value;
          }
          if (errors.gratitud?.hasError) {
            runValidationTasks("gratitud", value);
          }
          setGratitud(value);
        }}
        onBlur={() => runValidationTasks("gratitud", gratitud)}
        errorMessage={errors.gratitud?.errorMessage}
        hasError={errors.gratitud?.hasError}
        {...getOverrideProps(overrides, "gratitud")}
      ></TextField>
      <TextField
        label="Pasatiempos"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={pasatiempos}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion,
              satisfaccion,
              aprendizaje,
              estres,
              ayuda,
              seguridad,
              actividadFisica,
              amistadFamilia,
              gratitud,
              pasatiempos: value,
              inspiracion,
              reflexion,
              comunicacion,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.pasatiempos ?? value;
          }
          if (errors.pasatiempos?.hasError) {
            runValidationTasks("pasatiempos", value);
          }
          setPasatiempos(value);
        }}
        onBlur={() => runValidationTasks("pasatiempos", pasatiempos)}
        errorMessage={errors.pasatiempos?.errorMessage}
        hasError={errors.pasatiempos?.hasError}
        {...getOverrideProps(overrides, "pasatiempos")}
      ></TextField>
      <TextField
        label="Inspiracion"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={inspiracion}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion,
              satisfaccion,
              aprendizaje,
              estres,
              ayuda,
              seguridad,
              actividadFisica,
              amistadFamilia,
              gratitud,
              pasatiempos,
              inspiracion: value,
              reflexion,
              comunicacion,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.inspiracion ?? value;
          }
          if (errors.inspiracion?.hasError) {
            runValidationTasks("inspiracion", value);
          }
          setInspiracion(value);
        }}
        onBlur={() => runValidationTasks("inspiracion", inspiracion)}
        errorMessage={errors.inspiracion?.errorMessage}
        hasError={errors.inspiracion?.hasError}
        {...getOverrideProps(overrides, "inspiracion")}
      ></TextField>
      <TextField
        label="Reflexion"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={reflexion}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion,
              satisfaccion,
              aprendizaje,
              estres,
              ayuda,
              seguridad,
              actividadFisica,
              amistadFamilia,
              gratitud,
              pasatiempos,
              inspiracion,
              reflexion: value,
              comunicacion,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.reflexion ?? value;
          }
          if (errors.reflexion?.hasError) {
            runValidationTasks("reflexion", value);
          }
          setReflexion(value);
        }}
        onBlur={() => runValidationTasks("reflexion", reflexion)}
        errorMessage={errors.reflexion?.errorMessage}
        hasError={errors.reflexion?.hasError}
        {...getOverrideProps(overrides, "reflexion")}
      ></TextField>
      <TextField
        label="Comunicacion"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={comunicacion}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion,
              satisfaccion,
              aprendizaje,
              estres,
              ayuda,
              seguridad,
              actividadFisica,
              amistadFamilia,
              gratitud,
              pasatiempos,
              inspiracion,
              reflexion,
              comunicacion: value,
              creatividad,
            };
            const result = onChange(modelFields);
            value = result?.comunicacion ?? value;
          }
          if (errors.comunicacion?.hasError) {
            runValidationTasks("comunicacion", value);
          }
          setComunicacion(value);
        }}
        onBlur={() => runValidationTasks("comunicacion", comunicacion)}
        errorMessage={errors.comunicacion?.errorMessage}
        hasError={errors.comunicacion?.hasError}
        {...getOverrideProps(overrides, "comunicacion")}
      ></TextField>
      <TextField
        label="Creatividad"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={creatividad}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              motivacion,
              relajacion,
              satisfaccion,
              aprendizaje,
              estres,
              ayuda,
              seguridad,
              actividadFisica,
              amistadFamilia,
              gratitud,
              pasatiempos,
              inspiracion,
              reflexion,
              comunicacion,
              creatividad: value,
            };
            const result = onChange(modelFields);
            value = result?.creatividad ?? value;
          }
          if (errors.creatividad?.hasError) {
            runValidationTasks("creatividad", value);
          }
          setCreatividad(value);
        }}
        onBlur={() => runValidationTasks("creatividad", creatividad)}
        errorMessage={errors.creatividad?.errorMessage}
        hasError={errors.creatividad?.hasError}
        {...getOverrideProps(overrides, "creatividad")}
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
