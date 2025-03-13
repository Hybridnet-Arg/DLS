/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const log = {
  success: (value) => console.log(`\n\x1b[32m${value}\x1b[0m`),
  error: (value) => console.error(`\n\x1b[31m${value}\x1b[0m`),
  info: (value) => console.log(`\n\x1b[34m${value}\x1b[0m`),
};

async function seedData(seedName, seedFn = async () => {}) {
  try {
    await seedFn();
    log.success('- Seeded ' + seedName);
  } catch (error) {
    log.error('- Error seeding ' + seedName);
    throw error;
  }
}

async function seedPerforadores() {
  const data = [
    {
      nombre: 'DLS4165',
      nombre_clave: '165',
      numero: 165,
      descripcion: 'Perforador robusto para terrenos duros.',
      estado: 'Mantenimiento',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'DLS4170',
      nombre_clave: 'DLS',
      numero: 170,
      descripcion: 'Perforador de alto rendimiento.',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'DLS4163',
      nombre_clave: 'DLS',
      numero: 163,
      descripcion: 'Perforador de alta capacidad.',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'DLS4156',
      nombre_clave: '156',
      numero: 156,
      descripcion: '156',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'DLS4172',
      nombre_clave: '172',
      numero: 172,
      descripcion: '172',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 2,
    },
    {
      nombre: 'DLS4173',
      nombre_clave: '173',
      numero: 173,
      descripcion: '173',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 2,
    },
    {
      nombre: 'DLS4174',
      nombre_clave: '174',
      numero: 174,
      descripcion: '174',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 2,
    },
    {
      nombre: 'DLS4160',
      nombre_clave: '160',
      numero: 160,
      descripcion: '160',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 2,
    },
    {
      nombre: 'PAE4001',
      nombre_clave: 'PAE001',
      numero: 1,
      descripcion: 'PAE001',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'PAE4163',
      nombre_clave: '163',
      numero: 163,
      descripcion: 'Perforador de alta capacidad.',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'PAE4166',
      nombre_clave: '166',
      numero: 166,
      descripcion: 'Perforador especializado en pozos profundos.',
      estado: 'Inactivo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'PAE4167',
      nombre_clave: '167',
      numero: 167,
      descripcion: 'Perforador de alto rendimiento.',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'PAE4168',
      nombre_clave: '168',
      numero: 168,
      descripcion: 'PAE168',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'PAE4169',
      nombre_clave: '169',
      numero: 169,
      descripcion: 'Perforador de última generación.',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'PAE4174',
      nombre_clave: '174',
      numero: 174,
      descripcion: 'PAE174',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'DLS4166',
      nombre_clave: '166',
      numero: 166,
      descripcion: '166',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'DLS4167',
      nombre_clave: '167',
      numero: 167,
      descripcion: '167',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'DLS4168',
      nombre_clave: '168',
      numero: 168,
      descripcion: '168',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'DLS4169',
      nombre_clave: '169',
      numero: 169,
      descripcion: '169',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
  ];
  return prisma.perforadores.createMany({ data });
}

async function seedUbicaciones() {
  const data = [{ nombre: 'Neuquén' }, { nombre: 'Comodoro Rivadavia' }];
  return prisma.ubicaciones.createMany({ data });
}

async function seedLocaciones() {
  const data = [
    {
      nombre: 'Locación 1',
      nombre_clave: 'LO004',
      descripcion: 'Área en el oeste con recursos probados.',
      deshabilitado: false,
    },
    {
      nombre: 'Locación 2',
      nombre_clave: 'LS002',
      descripcion: 'Área en el sur con alta potencialidad para perforación.',
      deshabilitado: false,
    },
    {
      nombre: 'Locación 3',
      nombre_clave: 'LN001',
      descripcion: 'Área en el norte para perforación de pozos petroleros.',
      deshabilitado: false,
    },
    {
      nombre: 'Locación 4',
      nombre_clave: 'LE003',
      descripcion: 'Área en el este conocida por su rica geología.',
      deshabilitado: false,
    },
    {
      nombre: 'Locación 5',
      nombre_clave: 'LO004',
      descripcion: 'Área en el oeste con recursos probados.',
      deshabilitado: false,
    },
    {
      nombre: 'Locación 6',
      nombre_clave: 'LO004',
      descripcion: 'Área en el oeste con recursos probados.',
      deshabilitado: false,
    },
    {
      nombre: 'Locación 7',
      nombre_clave: 'LS002',
      descripcion: 'Área en el sur con alta potencialidad para perforación.',
      deshabilitado: false,
    },
    {
      nombre: 'Locación 8',
      nombre_clave: 'LN001',
      descripcion: 'Área en el norte para perforación de pozos petroleros.',
      deshabilitado: false,
    },
    {
      nombre: 'Locación 9',
      nombre_clave: 'LE003',
      descripcion: 'Área en el este conocida por su rica geología.',
      deshabilitado: false,
    },
    {
      nombre: 'Locación 10',
      nombre_clave: 'LO004',
      descripcion: 'Área en el oeste con recursos probados.',
      deshabilitado: false,
    },
    {
      nombre: 'Locación 11',
      nombre_clave: 'LOOO5',
      descripcion: 'LOOO5',
      deshabilitado: false,
    },
    {
      nombre: 'Locación 12',
      nombre_clave: 'LOO06',
      descripcion: 'LOOO6',
      deshabilitado: false,
    },
    {
      nombre: 'Locación 13',
      nombre_clave: 'LOOO7',
      descripcion: 'LOOO7',
      deshabilitado: false,
    },
    {
      nombre: 'Locación 14',
      nombre_clave: 'LOOO14',
      descripcion: 'LOOO14',
      deshabilitado: false,
    },
  ];

  return prisma.locaciones.createMany({ data });
}

async function seedPerforadorLocaciones() {
  const defaultValues = { activo: true };

  const data = [
    {
      locacion_id: 1,
      perforador_id: 1,
      ...defaultValues,
    },
    {
      locacion_id: 2,
      perforador_id: 2,
      ...defaultValues,
    },
    {
      locacion_id: 3,
      perforador_id: 3,
      ...defaultValues,
    },
    {
      locacion_id: 4,
      perforador_id: 4,
      ...defaultValues,
    },
    {
      locacion_id: 5,
      perforador_id: 5,
      ...defaultValues,
    },
    {
      locacion_id: 6,
      perforador_id: 6,
      ...defaultValues,
    },
    {
      locacion_id: 7,
      perforador_id: 7,
      ...defaultValues,
    },
    {
      locacion_id: 8,
      perforador_id: 8,
      ...defaultValues,
    },
    {
      locacion_id: 9,
      perforador_id: 9,
      ...defaultValues,
    },
    {
      locacion_id: 10,
      perforador_id: 10,
      ...defaultValues,
    },
    {
      locacion_id: 11,
      perforador_id: 11,
      ...defaultValues,
    },
    {
      locacion_id: 12,
      perforador_id: 12,
      ...defaultValues,
    },
    {
      locacion_id: 13,
      perforador_id: 13,
      ...defaultValues,
    },
    {
      locacion_id: 14,
      perforador_id: 14,
      ...defaultValues,
    },
  ];
  return prisma.perforador_locaciones.createMany({ data });
}

async function seedTiposEtapaPozo() {
  const data = [
    { nombre: 'Guía' },
    { nombre: 'Intermedia' },
    { nombre: 'Intermedia' },
    { nombre: 'Aislación' },
  ];
  return prisma.tipos_etapa_pozo.createMany({ data });
}

async function seedMarcas() {
  const data = [
    { nombre: 'Varco' },
    { nombre: 'M&M - Lower Top Drive' },
    { nombre: 'M&M - Upper Top Drive' },
  ];
  return prisma.marcas.createMany({ data });
}

async function seedModelos() {
  const data = [
    {
      nombre: '120',
      marca_id: 1,
    },
    {
      nombre: '140',
      marca_id: 1,
    },
    {
      nombre: '3-00-66ARRUT15 (H2S TRIM - NACE MR0175)  15M WP',
      marca_id: 2,
    },
    {
      nombre: '3-00-103-0TV (H2S TRIM - NACE MR0175) 15M WP',
      marca_id: 3,
    },
    {
      nombre: 'AX3-06-RACR645TV (H2S TRIM - NACE MR0175) 15M WP',
      marca_id: 3,
    },
  ];
  return prisma.modelos.createMany({ data });
}

async function seedDiametros() {
  const data = [
    {
      pulgadas: '1 1/4',
      corte: 1200.0,
      largo_corte: 30.0,
      metros_cable: 1500.0,
      metros_despliegue: 600.0,
    },
    {
      pulgadas: '1 3/8',
      corte: 2000.0,
      largo_corte: 35.0,
      metros_cable: 1500.0,
      metros_despliegue: 600.0,
    },
  ];
  return prisma.diametros.createMany({ data });
}

async function seedTiposRosca() {
  const data = [
    {
      nombre: 'VX-39- 6.5/8"Reg',
    },
    {
      nombre: 'XT-39- 6.5/8"Reg',
    },
    {
      nombre: 'NC-50 6.5/8"Reg',
    },
    {
      nombre: 'NC-46- 6.5/8"Reg',
    },
    {
      nombre: 'NC-38- 6.5/8"Reg',
    },
    {
      nombre: 'ST-40+ 6.5/8"Reg',
    },
    {
      nombre: 'TSDS-40- 6.5/8"Reg',
    },
    {
      nombre: 'UXT-39- 6.5/8"Reg',
    },
    {
      nombre: 'UXT-40- 6.5/8"Reg',
    },
    {
      nombre: 'Delta-425- 6.5/8"Reg',
    },
  ];
  return prisma.tipos_rosca.createMany({ data });
}

async function seedDepositos() {
  const data = [
    {
      nombre: 'DepositoDLS165',
      perforador_id: 2,
    },
    {
      nombre: 'DepositoDLS167',
      perforador_id: 1,
    },
    {
      nombre: 'DepositoDLS166',
      perforador_id: 3,
    },
    {
      nombre: 'DepositoDLS163',
      perforador_id: 4,
    },
    {
      nombre: 'DepositoDLS170',
      perforador_id: 5,
    },
    {
      nombre: 'DepositoPAE169',
      perforador_id: 6,
    },
    {
      nombre: 'DepositoDLS4163',
      perforador_id: 7,
    },
    {
      nombre: 'DepositoDLS4156',
      perforador_id: 8,
    },
    {
      nombre: 'DepositoDLS4173',
      perforador_id: 9,
    },
    {
      nombre: 'DepositoDLS4160',
      perforador_id: 10,
    },
    {
      nombre: 'DepositoDLS4170',
      perforador_id: 11,
    },
    {
      nombre: 'DepositoPAE4001',
      perforador_id: 12,
    },
    {
      nombre: 'DepositoPAE4168',
      perforador_id: 13,
    },
    {
      nombre: 'DepositoPAE4174',
      perforador_id: 14,
    },
  ];

  return prisma.depositos.createMany({ data });
}

async function seedComponentes() {
  const data = [{ nombre: 'Top drive' }, { nombre: 'Ciclos cable' }];
  return prisma.componentes.createMany({ data });
}

async function seedTiposElemento() {
  const data = [
    {
      nombre: 'Válvula',
      horas_desde: 0,
      horas_hasta: 300,
    },
    {
      nombre: 'Conector',
      horas_desde: 300,
      horas_hasta: 700,
    },
    {
      nombre: 'Tubo',
      horas_desde: 700,
      horas_hasta: 1000,
    },
  ];
  return prisma.tipos_elemento.createMany({ data });
}

async function seedElementos() {
  const data = [
    {
      nombre: 'Lower IBOP',
      tipo_elemento_id: 1,
    },
    {
      nombre: 'Upper IBOP',
      tipo_elemento_id: 1,
    },
    {
      nombre: 'Saver Sub',
      tipo_elemento_id: 2,
    },
    {
      nombre: 'WashPipe',
      tipo_elemento_id: 3,
    },
    {
      nombre: 'Bobina',
      tipo_elemento_id: 1,
    },
  ];
  return prisma.elementos.createMany({ data });
}

async function seedComponentesPerforador() {
  const TOP_DRIVE = 1;
  const CICLOS_CABLE = 2;

  const perforadores = await prisma.perforadores.findMany();
  const cpTopDrive = perforadores.map((perforador) => ({
    componente_id: TOP_DRIVE,
    perforador_id: perforador.id,
  }));
  const cpCiclosCable = perforadores.map((perforador) => ({
    componente_id: CICLOS_CABLE,
    perforador_id: perforador.id,
  }));
  const data = [...cpTopDrive, ...cpCiclosCable];
  return prisma.componentes_perforador.createMany({ data });
}

async function seedElementosComponente() {
  const LOWER_IBOP = 1;
  const UPPER_IBOP = 2;
  const WASH_PIPE = 3;
  const SAVER_SUB = 4;
  const BOBINA = 5;

  const defaultValues = { stock: 0 };
  const componentesPerforador = await prisma.componentes_perforador.findMany();

  const lowerIbop = componentesPerforador.map((componentePerforador) => ({
    componente_perforador_id: componentePerforador.id,
    elemento_id: LOWER_IBOP,
    ...defaultValues,
  }));
  const upperIbop = componentesPerforador.map((componentePerforador) => ({
    componente_perforador_id: componentePerforador.id,
    elemento_id: UPPER_IBOP,
    ...defaultValues,
  }));
  const washPipe = componentesPerforador.map((componentePerforador) => ({
    componente_perforador_id: componentePerforador.id,
    elemento_id: WASH_PIPE,
    ...defaultValues,
  }));
  const saverSub = componentesPerforador.map((componentePerforador) => ({
    componente_perforador_id: componentePerforador.id,
    elemento_id: SAVER_SUB,
    ...defaultValues,
  }));
  const bobina = componentesPerforador.map((componentePerforador) => ({
    componente_perforador_id: componentePerforador.id,
    elemento_id: BOBINA,
    ...defaultValues,
  }));
  const data = [
    ...lowerIbop,
    ...upperIbop,
    ...washPipe,
    ...saverSub,
    ...bobina,
  ];
  return prisma.elementos_componente.createMany({ data });
}

async function seedEstadosCronograma() {
  const data = [
    { nombre: 'Activo' },
    { nombre: 'Finalizado' },
    { nombre: 'Pendiente' },
  ];
  return prisma.estados_cronograma.createMany({ data });
}

async function seedTiposTareaForecast() {
  const tiposA = [
    { color: '#85726A', nombre: 'FASE GUIA', nombre_clave: 'G', tipo: 'A' },
    {
      color: '#6A5144',
      nombre: 'FASE INTERMEDIA',
      nombre_clave: 'I',
      tipo: 'A',
    },
    {
      color: '#28170C',
      nombre: 'FASE AISLACION',
      nombre_clave: 'A',
      tipo: 'A',
    },
    { color: '#FFFFFF', nombre: 'WALKING', nombre_clave: 'WS', tipo: 'A' },
    {
      color: '#FFFFFF',
      nombre: 'DESMONTAJE TRASLADO MONTAJE',
      nombre_clave: 'DTM',
      tipo: 'A',
    },
  ];
  const tiposB = tiposA.map((tipo) => ({
    ...tipo,
    tipo: 'B',
    color: '#F6D92E',
  }));

  return prisma.tipos_tarea_forecast.createMany({
    data: [...tiposA, ...tiposB],
  });
}

async function seedPlanificacionAreas() {
  const data = [
    {
      nombre: 'Supply chain',
      planificacion_actividades: {
        createMany: {
          data: [
            {
              nombre: 'Evaluación de compra',
            },
            {
              nombre: 'Evaluación de costos',
            },
            {
              nombre: 'Evaluación de Stock disponible',
            },
          ],
        },
      },
    },
    {
      nombre: 'RRHH',
      planificacion_actividades: {
        createMany: {
          data: [
            {
              nombre: 'Solicitud de personal - CRT',
            },
            {
              nombre: 'Solicitud de personal - Entubada',
            },
          ],
        },
      },
    },
    {
      nombre: 'Logistica',
      planificacion_actividades: {
        createMany: {
          data: [
            {
              nombre: 'CRT',
            },
            {
              nombre: 'GASOIL',
            },
            {
              nombre: 'Llave H',
            },
            {
              nombre: 'Llave Torque',
            },
            {
              nombre: 'Grua',
            },
            {
              nombre: 'Petrolero',
            },
            {
              nombre: 'Montaje MPD',
            },
            {
              nombre: 'Envio de Barras',
            },
            {
              nombre: 'Retiro de Barras',
            },
          ],
        },
      },
    },
    {
      nombre: 'SSMAC',
      planificacion_actividades: {
        createMany: {
          data: [
            {
              nombre: 'Verificación de equipamiento',
            },
            {
              nombre: 'Gestión con JE',
            },
            {
              nombre: 'Checklist',
            },
            {
              nombre: 'Sindicato',
            },
          ],
        },
      },
    },
    {
      nombre: 'IT',
      planificacion_actividades: {
        createMany: {
          data: [
            {
              nombre: 'Visita de Mantenimiento Preventivo',
            },
            {
              nombre: 'Visita por Proyecto',
            },
            {
              nombre: 'Visita por Mantenimiento Correctivo',
            },
          ],
        },
      },
    },
    {
      nombre: 'Tubulares',
      planificacion_actividades: {
        createMany: {
          data: [
            {
              nombre: 'Solicitar Barras a Taller',
            },
            {
              nombre: 'Enviar Barras a Taller',
            },
          ],
        },
      },
    },
    {
      nombre: 'Servicios Generales',
      planificacion_actividades: {
        createMany: {
          data: [
            {
              nombre: 'Visita de mantenimiento preventivo',
            },
            {
              nombre: 'Visita por Proyecto',
            },
            {
              nombre: 'Visita por Mantenimiento Correctivo',
            },
          ],
        },
      },
    },
    {
      nombre: 'Mantenimiento',
      planificacion_actividades: {
        createMany: {
          data: [
            {
              nombre: 'Engrase de caño Lavador',
            },
            {
              nombre: 'Engrase de IBOP',
            },
            {
              nombre: 'Mantenimiento de bombas',
            },
            {
              nombre: 'Mantenimiento de bombas',
            },
            {
              nombre: 'Mantenimiento de Zarandas',
            },
            {
              nombre: 'Test Frenado DW',
            },
          ],
        },
      },
    },
  ];

  for (const item of data) {
    await prisma.planificacion_areas.create({ data: item });
  }
}

const SEED_LIST_COMMAND = 'list';
const SEED_COMMANDS = {
  ubicaciones: seedUbicaciones,
  perforadores: seedPerforadores,
  locaciones: seedLocaciones,
  perforador_locaciones: seedPerforadorLocaciones,
  tipos_etapa_pozo: seedTiposEtapaPozo,
  marcas: seedMarcas,
  modelos: seedModelos,
  diametros: seedDiametros,
  tipos_rosca: seedTiposRosca,
  tipos_elemento: seedTiposElemento,
  depositos: seedDepositos,
  componentes: seedComponentes,
  elementos: seedElementos,
  componentes_perforador: seedComponentesPerforador,
  elementos_componente: seedElementosComponente,
  estados_cronograma: seedEstadosCronograma,
  tipos_tarea_forecast: seedTiposTareaForecast,
  planificacion_areas: seedPlanificacionAreas,
};

async function executeSeedCommand(command = '') {
  if (command === SEED_LIST_COMMAND) {
    log.info('- Available seed commands:\n');
    Object.keys(SEED_COMMANDS).forEach((command) => {
      log.info(`* ${command}`);
    });
    return;
  }

  const isValidSeed = Object.keys(SEED_COMMANDS).includes(command);
  if (!isValidSeed) throw new Error(`Seed "${command}" does not exist`);

  log.success('Seeding started...');
  await seedData(command, SEED_COMMANDS[command]);
  log.success('Seeding completed successfully!');
}

async function main() {
  try {
    const seedCommand = process.argv[2];
    if (seedCommand) return await executeSeedCommand(seedCommand);

    log.success('Seeding started...');
    for (const [name, fn] of Object.entries(SEED_COMMANDS)) {
      await seedData(name, fn);
    }
    log.success('Seeding completed successfully!');
  } catch (error) {
    log.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
