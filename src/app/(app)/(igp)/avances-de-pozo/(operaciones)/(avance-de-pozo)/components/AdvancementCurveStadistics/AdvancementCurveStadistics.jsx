import SelectorPozos from './SelectorPozos';
import WellAdvancementDates from './WellAdvancementDates';
import WellAdvancementStatistics from './WellAdvancementStatistics';
import WellAdvancementStatisticsAdvanceCurve from './WellAdvancementStatisticsAdvanceCurve';
import WellAdvancementParameters from './WellAdvancementParameters';

export default function AdvancementCurveStadistics({
  pozos = [],
  hole = {},
  handleSelectHole = () => {},
}) {
  return (
    <>
      <SelectorPozos
        pozos={pozos}
        handleSelectHole={handleSelectHole}
        hole={hole}
      />
      <WellAdvancementDates
        finalDate={hole?.plan_pozo?.fecha_fin}
        initDate={hole?.plan_pozo?.fecha_inicio}
      />
      <WellAdvancementStatistics
        etapasPozo={hole?.etapas_pozo ?? []}
        nivelTrepano={hole?.avances_pozo?.[0]?.profundidad ?? 0}
      />
      <WellAdvancementParameters
        titleBitPosition={`Bit Position`}
        valueBitPosition={hole?.avances_pozo?.[0]?.nivel_trepano || 0}
        titleHoleDepth={`Hole Depth`}
        valueHoleDepth={hole?.avances_pozo?.[0]?.profundidad || 0}
        isBlinking={hole?.en_progreso || false}
      ></WellAdvancementParameters>
      <WellAdvancementStatisticsAdvanceCurve
        etapasPozo={hole?.etapas_pozo ?? []}
        trepanLevel={hole?.avances_pozo?.[0]?.profundidad ?? 0}
        updatedAt={hole?.avances_pozo?.[0]?.creado_el ?? new Date()}
        depth={hole?.profundidad ?? 0}
      />
    </>
  );
}
