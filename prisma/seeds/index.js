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
      nombre_clave: '170',
      numero: 170,
      descripcion: 'Perforador de alto rendimiento.',
      estado: 'Operativo',
      deshabilitado: false,
      ubicacion_id: 1,
    },
    {
      nombre: 'DLS4163',
      nombre_clave: '163',
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
      nombre_clave: '1',
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
  const perforadores = await prisma.perforadores.findMany();
  const fechaFin = new Date();
  fechaFin.setFullYear(fechaFin.getFullYear() + 1);

  const data = perforadores.map((perforador) => ({
    nombre: `Locación ${perforador.id}`,
    nombre_clave: `LO00${perforador.id}`,
    descripcion: `Locación de perforador ${perforador.id}`,
    deshabilitado: false,
    coordenadas: '12.3456789,-12.3456789',
    fecha_inicio: new Date(),
    fecha_fin: fechaFin,
  }));

  return prisma.locaciones.createMany({ data });
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
  const perforadores = await prisma.perforadores.findMany();
  const data = perforadores.map((perforador) => ({
    nombre: `Deposito ${perforador.id} - ${perforador.nombre}`,
    perforador_id: perforador.id,
  }));

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

async function seedTubularesRangos() {
  const data = [
    { nombre: 'Rango II' },
    { nombre: 'Rango III' },
    { nombre: 'Otro' },
  ];
  return prisma.tubulares_rangos.createMany({ data });
}
async function seedTubularesTiposConexion() {
  const data = [
    { nombre: 'NC-50 GRADO G' },
    { nombre: 'NC-50 GRADO S' },
    { nombre: 'ST-40+' },
    { nombre: 'TSDS-40' },
    { nombre: 'VX-39' },
    { nombre: 'XT-39' },
    { nombre: 'Otro' },
  ];
  return prisma.tubulares_tipos_conexion.createMany({ data });
}
async function seedTubularesTiposBarras() {
  const data = [
    { nombre: 'Barra de sondeo' },
    { nombre: 'Hemingway' },
    { nombre: 'Porta mecha' },
    { nombre: 'Otro' },
  ];
  return prisma.tubulares_tipos_barra.createMany({ data });
}
async function seedTubularesProveedores() {
  const data = [{ nombre: 'Test' }];
  return prisma.tubulares_proveedores.createMany({ data });
}

async function seedTubularesEstadosBarra() {
  const data = [
    { nombre: 'Operativas' },
    { nombre: 'Inspeccion/reparación' },
    { nombre: 'Descarte' },
  ];
  return prisma.tubulares_estados_barra.createMany({ data });
}

async function seedTubularesDestinos() {
  const data = [
    { nombre: 'Locación' },
    { nombre: 'Taller' },
    { nombre: 'Base' },
    { nombre: 'Otro perforador' },
    { nombre: 'Scrap' },
    { nombre: 'Perdida en pozo' },
  ];
  return prisma.tubulares_destinos.createMany({ data });
}

async function seedTubularesTalleres() {
  const data = [{ nombre: 'OTI' }, { nombre: 'NDT' }, { nombre: 'BM' }];
  return prisma.tubulares_talleres.createMany({ data });
}

async function seedTanques() {
  const perforadores = await prisma.perforadores.findMany();
  const fechaFin = new Date();
  fechaFin.setFullYear(fechaFin.getFullYear() + 1);

  const data = perforadores.map((perforador) => ({
    perforador_id: perforador?.id,
    capacidad: 77000,
    nivel_critico: 10000,
    nivel_alerta: 20000,
    habilitado: true,
    en_uso: true,
  }));

  return prisma.tanques.createMany({ data });
}

const SEED_LIST_COMMAND = 'list';
const SEED_COMMANDS = {
  ubicaciones: seedUbicaciones,
  perforadores: seedPerforadores,
  locaciones: seedLocaciones,
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
  tubulares_rangos: seedTubularesRangos,
  tubulares_tipos_conexion: seedTubularesTiposConexion,
  tubulares_tipos_barra: seedTubularesTiposBarras,
  tubulares_proveedores: seedTubularesProveedores,
  tubulares_estados_barra: seedTubularesEstadosBarra,
  tubulares_destinos: seedTubularesDestinos,
  tubulares_talleres: seedTubularesTalleres,
  tanques: seedTanques,
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
