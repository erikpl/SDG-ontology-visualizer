import { Stack } from '@chakra-ui/react';
import React from 'react';
import Connections from '../atoms/Connections';
import { Node } from '../../types/ontologyTypes';
import useTranslation from '../../hooks/translations';

type AllConnectionsProps = {
  contributions: Array<Node>;
  tradeOffs: Array<Node>;
  developmentAreas: Array<Node>;
  onClick: (connection: Node, predicate: Array<string>) => void;
};

// Wrapper component to render contrbutions, tradeoffs and development areas, which reduces the lines required in DetailView
const AllConnections: React.FC<AllConnectionsProps> = ({
  contributions,
  tradeOffs,
  developmentAreas,
  onClick,
}: AllConnectionsProps) => {
  const translations = useTranslation(); 
  
  return (
    <Stack spacing={5} minW="40%">
      <Connections
        connections={contributions}
        titles={[`${translations.getString('HasPositiveEffectOn')}:`, translations.getString('HasNoEstablishedPositiveContributions')]}
        color="green"
        predicate={[
          'positiv virkning',
          'http://www.semanticweb.org/aga/ontologies/2017/9/SDG#harBidragTil',
        ]}
        handleOnClick={onClick}
      />
      <Connections
        connections={tradeOffs}
        titles={[`${translations.getString('HasNegativeEffectOn')}:`, translations.getString('HasNoEstablishedNegativeContributions')]}
        color="red"
        predicate={[
          'negative virkning',
          'http://www.semanticweb.org/aga/ontologies/2017/9/SDG#harTradeOffTil',
        ]}
        handleOnClick={onClick}
      />
      <Connections
        connections={developmentAreas}
        titles={[`${translations.getString('HasDevelopmentAreaTo')}:`, translations.getString('HasNoDevelopmentAreas')]}
        color="blue"
        predicate={[
          'utviklingsområde',
          'http://www.semanticweb.org/aga/ontologies/2017/9/SDG#harUtviklingsOmråde',
        ]}
        handleOnClick={onClick}
      />
    </Stack>
  );
  };

export default AllConnections;
