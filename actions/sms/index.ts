"use server";

import { z } from "zod";
import validator from "validator";

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

const verifySchema = z.coerce.number().min(100000).max(999999);

export async function smsVerification(prevState: any, formData: FormData) {}
