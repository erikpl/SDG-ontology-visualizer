import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAnnotations,
  getContributions,
  getDevelopmentArea,
  getTradeOff,
} from '../../api/ontologies';
import { mapCorrelationToName } from '../../common/node';
import { isUrl } from '../../common/regex';
import setBrowserPosition from '../../common/setBrowserPositionToDetailView';
import { useLanguageContext } from '../../contexts/LanguageContextProvider';
import useTranslation from '../../hooks/translations';
import { selectNode } from '../../state/reducers/ontologyReducer';
import { RootState } from '../../state/store';
import { Annotation, Node } from '../../types/ontologyTypes';
import ContextDivider from '../atoms/ContextDivider';
import SlideInDrawer from '../atoms/SlideInDrawer';
import AllConnections from './AllConnections';

const DetailView: React.FC = () => {
  const [annotations, setAnnotations] = useState<Annotation>({
    label: '',
    moreInformation: '',
    description: '',
  });
  const [objectAnnotations, setObjectAnnotations] = useState<Annotation>();
  const [contributions, setContributions] = useState<Array<Node>>([]);
  const [tradeOffs, setTradeOffs] = useState<Array<Node>>([]);
  const [developmentAreas, setDevelopmentAreas] = useState<Array<Node>>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [selectedConnection, setSelectedConnection] = useState<Node>();
  const [selectedPredicate, setSelectedPredicate] = useState<Array<string>>();
  const dispatch = useDispatch();
  const selectedNode = useSelector((state: RootState) => state.ontology.selectedNode);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const translations = useTranslation(); 
  const { language } = useLanguageContext();

  /*
    Promise wrappers for API calls. To use Promise.allSettled (in order to get parallel API calls) in promises with function parameters, the function calls had to be wrapped in an async function. While this clutters the code a bit, the alternative would be to make sequential API calls, effectively quadrupling the time API delay for the DetailView. 
  */
  const setAnnotationsPromise = async (node: Node): Promise<void> => {
    const annotation: Annotation = {
      label: translations.getString(node.id.slice(node.id.indexOf('B') + 1).toString()),
      description: translations.getString('desc'.concat(node.id.slice(node.id.indexOf('B') + 1).toString())),
      moreInformation: '',
    };
    setAnnotations(annotation);
  };
  const setContributionsPromise = async (node: Node): Promise<void> => {
    setContributions(await getContributions(node.id));
  };
  const setTradeOffsPromise = async (node: Node): Promise<void> => {
    setTradeOffs(await getTradeOff(node.id));
  };
  const setDevelopmentAreasPromise = async (node: Node): Promise<void> => {
    setDevelopmentAreas(await getDevelopmentArea(node.id));
  };

  const loadData = async () => {
    if (!selectedNode) return;
    await Promise.allSettled([
      setAnnotationsPromise(selectedNode),
      setContributionsPromise(selectedNode),
      setTradeOffsPromise(selectedNode),
      setDevelopmentAreasPromise(selectedNode),
    ]);
    setIsLoading(false);
    if (!hasInitialized) {
      setHasInitialized(true);
    } else {
      setBrowserPosition();
    }
  };

  const loadObjectPropertyAnnotations = async () => {
    if (!selectedPredicate) return;
    setObjectAnnotations(undefined);
    setObjectAnnotations(await getAnnotations(selectedPredicate[1]));
    setIsLoading(false);
  };

  const expandConnection = async (connection: Node, predicate: Array<string>) => {
    setIsLoading(true);
    setSelectedConnection(connection);
    setSelectedPredicate(predicate);
    setExpanded(true);
  };

  const onClickConnections = (node: Node) => {
    setIsLoading(true);
    setExpanded(false);
    if (selectedNode && selectedNode.id !== node.id) {
      dispatch(selectNode(node));
    }
  };

  const getCorrelationTitle = () => {
    if (selectedConnection == null || selectedPredicate == null) return translations.getString('Loading');
    let text = translations.getString('has').concat(' ');
    const correlationStrength = mapCorrelationToName(selectedConnection.correlation);
    if (correlationStrength !== '')
      text += translations.getString(correlationStrength).concat(' ');
    switch (selectedPredicate[0]) {
      case 'positiv virkning': text += translations.getString('positiveEffect').concat(' ');
        break;
      case 'negative virkning': text += translations.getString('negativeEffect').concat(' ');
        break;
      default:
        break;
    }

    text += translations.getString('to').concat(' ');

    return text;
  };

  const getCorrelationText = () => {
    if (objectAnnotations == null) return translations.getString('Loading');
    let text = translations.getString('TheRelation').concat(' "');

    switch (objectAnnotations.label) {
      case 'harTradeOffTil': text += translations.getString('hasTradeoffTo');
        break;
      case 'harUtviklingsområde': text += translations.getString('hasDevelopmentArea');
        break;
      case 'harBidragTil': text += translations.getString('hasContributionTo');
        break;
      default:
        break;
    }

    text += '" ';
    text += translations.getString('isA').concat(' ');
    
    if (objectAnnotations.description.includes('utviklingsområder')) text += translations.getString('developmentAreaRelation');
    else if (objectAnnotations.description.includes('positiv påvirkning')) text += translations.getString('binaryPositiveRelation');
    else if (objectAnnotations.description.includes('negativ påvirkning')) text += translations.getString('binaryNegativeRelation');

    return text;
  };

  useEffect(() => {
    loadData();
    onClickConnections(selectedNode!);
  }, [selectedNode]);

  useEffect(() => {
    loadObjectPropertyAnnotations();
  }, [selectedPredicate]);

  useEffect(() => {
    setHasInitialized(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [language]);

  return (
    <Box id="detailView" bg="cyan.700" py={8} px={[4, null, null, 8]} color="white" rounded="lg">
      <Heading as="h2" size="lg" pb="2">
        {isLoading
          ? translations.getString('Loading')
          : annotations.label.toUpperCase() ||
            (selectedNode && selectedNode.name) ||
            translations.getString('NameMissing')}
      </Heading>
      <Flex visibility={isLoading ? 'hidden' : 'visible'} justify="space-between">
        <SlideInDrawer expanded={!expanded} width="40vw">
          <>
            <Text fontSize="lg" mt="2">
              {annotations.description
                ? annotations.description
                : translations.getString('ConceptUnderDevelopment')}
            </Text>
            {annotations.moreInformation && (
              <Text fontSize="base" mt="2">
                {translations.getString('MoreInfo')}
                {'  '}
                {isUrl(annotations.moreInformation) ? (
                  <Link href={annotations.moreInformation} isExternal fontWeight="bold">
                    {annotations.moreInformation}
                  </Link>
                ) : (
                  annotations.moreInformation
                )}
              </Text>
            )}
          </>
        </SlideInDrawer>
        <ContextDivider visible={!expanded} />
        <AllConnections
          contributions={contributions}
          tradeOffs={tradeOffs}
          developmentAreas={developmentAreas}
          onClick={expandConnection}
        />
        <ContextDivider visible={expanded} />
        <SlideInDrawer expanded={expanded} width="40vw">
          <Stack spacing="5">
            <Heading as="h2" size="lg">
              {annotations.label}
              <Heading size="lg" color="cyan.200">
                {getCorrelationTitle()}
              </Heading>
              {selectedConnection && selectedConnection.name}
            </Heading>
            <Text fontSize="md" mt="2">
              {getCorrelationText()}
            </Text>
            <ButtonGroup>
              <Button
                bg="white"
                color="cyan.700"
                size="sm"
                onClick={() => onClickConnections(selectedConnection!)}
              >
                {`${translations.getString('GoTo')} 
              ${selectedConnection && selectedConnection.name}`}
              </Button>
              <Button
                aria-label={translations.getString('Close')} 
                size="sm"
                onClick={() => setExpanded(false)}
                bg="white"
                color="cyan.700"
                rightIcon={<ArrowForwardIcon />}
              >
                Lukk
              </Button>
            </ButtonGroup>
          </Stack>
        </SlideInDrawer>
      </Flex>
    </Box>
  );
};

DetailView.defaultProps = { node: undefined };
export default DetailView;
