import React from 'react';
import { Image } from '@chakra-ui/react';
import { SustainabilityGoal } from '../../types/ontologyTypes';
import { MotionBox } from '../../types/react/componentTypes';
import useTranslation from '../../hooks/translations';

type IconContainerProps = {
  sustainabilityNode: SustainabilityGoal;
  onClick: (sdg: SustainabilityGoal) => void;
};

const IconContainer: React.FC<IconContainerProps> = ({
  sustainabilityNode,
  onClick,
}: IconContainerProps) => {
  const translations = useTranslation(); 
  
  return (
    <MotionBox
      p={0}
      whileHover={{ scale: 1.05 }}
      _hover={{
        cursor: 'pointer',
      }}
      onClick={() => onClick(sustainabilityNode)}
    >
      <Image
        src={translations.getString('icon_'.concat((sustainabilityNode.instancesOf.slice(sustainabilityNode.instancesOf.indexOf('B') + 1))))}
        borderRadius="lg"
        overflow="hidden"
        alt={translations.getString(sustainabilityNode.instancesOf.slice(sustainabilityNode.instancesOf.indexOf('B') + 1))}
        boxSize="250"
        object-fit="cover"
      />
    </MotionBox>
  );
};

export default IconContainer;
