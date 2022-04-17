import { Button, Text, Wrap } from '@chakra-ui/react';
import React from 'react';
import { mapCorrelationToColor } from '../../common/node';
import useTranslation from '../../hooks/translations';
import { Node } from '../../types/ontologyTypes';

type ConnectionsProps = {
  connections: Array<Node>;
  titles: Array<string>;
  predicate: Array<string>;
  color: string;
  handleOnClick: (selectedConnection: Node, predicate: Array<string>) => void;
};
const Connections: React.FC<ConnectionsProps> = ({
  connections,
  titles,
  color,
  predicate,
  handleOnClick,
}: ConnectionsProps) =>  {
  const translations = useTranslation(); 

  const getConnectionTitle = (connection: Node) => {
    if (connection.id.match(/#B[1-9]/g))
      return translations.getString(connection.id.slice(connection.id.indexOf('B') + 1));
    return translations.getString(connection.id.slice(connection.id.indexOf('#') + 1));
  };

  return (
    <>
      <Text as="b" fontSize="lg">
        {connections.length ? titles[0] : titles[1]}
      </Text>
      <Wrap>
        {connections
          .filter(c => c)
          .sort((a, b) => b.correlation - a.correlation)
          .map((connection) => (
            <Button
              colorScheme="whiteAlpha"
              size="sm"
              bg={color + mapCorrelationToColor(connection.correlation)}
              key={connection.id}
              onClick={() => handleOnClick(connection, predicate)}
            >
              {getConnectionTitle(connection)}
            </Button>
          ))}
      </Wrap>
    </>
  );
};

export default Connections;
