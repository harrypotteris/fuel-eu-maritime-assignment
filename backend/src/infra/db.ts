// small wrapper for db utils (extend if needed)
import { prisma } from "../adapters/outbound/prismaClient";

export const db = prisma;
