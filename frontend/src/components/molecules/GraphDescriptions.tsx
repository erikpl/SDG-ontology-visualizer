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
      <GraphNodeKey description={translations.getString('StandardColor')} hex='#63B3ED' />
      <GraphNodeKey description={translations.getString('Sdg')} hex='#D6BCFA' />
      <GraphNodeKey description={translations.getString('Target')} hex='#FBD38D' />
      <GraphNodeKey description={translations.getString('Tbl')} hex='#68D391' />
      <GraphNodeKey description={translations.getString('DevelopmentArea')} hex='#FC8181' />
    </Stack>
  );
};

export default GraphDescriptions;
