import { Stack } from '@chakra-ui/react';
import React from 'react';
import useTranslation from '../../hooks/translations';
import GraphNodeKey from '../atoms/GraphNodeKey';

interface GraphDescriptionsProps {
  float: boolean;
}

const GraphDescriptions: React.FC<GraphDescriptionsProps> = ({ float }: GraphDescriptionsProps) => {
  const translations = useTranslation(); 

  return (
    <Stack
      width={[null, null, null, '20vw', '17vw']}
      position={float ? 'absolute' : 'static'}
      right={0}
      bgColor="white"
      boxShadow="md"
      rounded="lg"
    >
      <GraphNodeKey description={translations.getString('standardColor')} />
      <GraphNodeKey description={translations.getString('sdg')} />
      <GraphNodeKey description={translations.getString('subgoal')} />
      <GraphNodeKey description={translations.getString('tbl')} />
      <GraphNodeKey description={translations.getString('developmentArea')} />
    </Stack>
  );
};

export default GraphDescriptions;
