import { celebrate, Joi } from "celebrate";

///// validações para users

export const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateUpdateMe = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

///// validações para vessels

export const validateCreateVessel = celebrate({
  body: Joi.object().keys({
    tag: Joi.string().trim().required(),
    nome: Joi.string().trim().required(),
    fabricante: Joi.string().trim().optional(),
    modelo: Joi.string().trim().optional(),
    numeroserie: Joi.string().trim().optional(),
    volume: Joi.number().optional(),
    pressaotrabalho: Joi.number().optional(),
    pressaoprojeto: Joi.number().optional(),
    temperaturaprojeto: Joi.number().optional(),
    fluido: Joi.string().trim().optional(),
    material: Joi.string().trim().optional(),
    anofabricacao: Joi.number().integer().optional(),
    localizacao: Joi.string().trim().optional(),
    datainspecao: Joi.date().iso().optional(),
    proximainspecao: Joi.date().iso().optional(),
    imagem: Joi.string().optional(),
    observacoes: Joi.string().optional(),
  }),
});

export const validateDeleteVessel = celebrate({
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
});

export const validateVesselId = celebrate({
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
});
