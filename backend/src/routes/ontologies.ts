import { Router, Request } from 'express';
import { verifyRequestQueryParams } from '../common/router';
import getAnnotations from '../database/getAnnotations';
import getClassesByString from '../database/getClassesByString';
import getContributions from '../database/getContributions';
import getDevelopmentArea from '../database/getDevelopmentArea';
import getRelations from '../database/getRelations';
import getSubclasses from '../database/getSubclasses';
import getSubGoals from '../database/getSubGoals';
import getSustainabilityGoals from '../database/getSustainabilityGoals';
import getTradeOff from '../database/getTradeOffTo';
import CheckMunicipalityByCode from '../database/CheckMunicipalityByCode';
import {
  AnnotationResponse,
  AnyResponse,
  ClassIdRequest,
  DocumentArrayArrayResponse,
  EmptyRequest,
  NodeArrayResponse,
  OntologyArrayResponse,
  RegexRequest,
} from '../types/routerTypes';
import onError from './middleware/onError';
import verifyDatabaseAccess from './middleware/verifyDatabaseAccess';
import getDocumentsForSubgoal from '../database/getDocumentsForSubgoal';
import { Document } from 'types/documentTypes';
import { doc } from 'prettier';

const router = Router();

const getRelationsFromClass = async (req: ClassIdRequest, res: OntologyArrayResponse) => {
  try {
    const data = await getRelations(req.params.classId);
    res.json(data);
  } catch (e: any) {
    onError(e, req, res);
  }
};

const getSubclassesFromClass = async (req: ClassIdRequest, res: NodeArrayResponse) => {
  try {
    const data = await getSubclasses(req.params.classId);
    res.json(data);
  } catch (e: any) {
    onError(e, req, res);
  }
};

const getAnnotationsFromClass = async (req: ClassIdRequest, res: AnnotationResponse) => {
  try {
    const data = await getAnnotations(req.params.classId);
    res.json(data);
  } catch (e: any) {
    onError(e, req, res);
  }
};

const getSustainabilityGoalsFromOntology = async (req: EmptyRequest, res: NodeArrayResponse) => {
  try {
    const data = await getSustainabilityGoals();
    res.json(data);
  } catch (e: any) {
    onError(e, req, res);
  }
};

const getContributionsToNodes = async (req: ClassIdRequest, res: NodeArrayResponse) => {
  try {
    const data = await getContributions(req.params.classId);
    res.json(data);
  } catch (e: any) {
    onError(e, req, res);
  }
};

const getTradeOffToNodes = async (req: ClassIdRequest, res: NodeArrayResponse) => {
  try {
    const data = await getTradeOff(req.params.classId);
    res.json(data);
  } catch (e: any) {
    onError(e, req, res);
  }
};

const getDevelopmentAreaToNodes = async (req: ClassIdRequest, res: NodeArrayResponse) => {
  try {
    const data = await getDevelopmentArea(req.params.classId);
    res.json(data);
  } catch (e: any) {
    onError(e, req, res);
  }
};

const getSubGoalsfromSDG = async (req: Request, res: NodeArrayResponse) => {
  try {
    const data = await getSubGoals(req.params.classId);
    res.json(data);
  } catch (e: any) {
    onError(e, req, res);
  }
};

const regexSearch = async (req: RegexRequest, res: NodeArrayResponse) => {
  try {
    const searchTerm = req.query.search;
    const limitResults = req.query.limit;
    verifyRequestQueryParams(searchTerm);
    const data = await getClassesByString(searchTerm!, limitResults);
    res.json(data);
  } catch (e: any) {
    onError(e, req, res);
  }
};

const checkMunicipalityByCode = async (req: Request, res: AnyResponse) => {
  try {
    const data = await CheckMunicipalityByCode(req.body.municipalityCode);
    res.json(data);
  } catch (e: any) {
    onError(e, req, res);
  }
};

// TODO: error handling?
// TODO: move into its own function
const getDocumentsForSubgoalByClassId = async (req: Request, res: DocumentArrayArrayResponse) => {
  try {
    const langCodes = req.params.langCodes.split(',');
    // unary + converts to number
    // Assuming languageCodes will be sent as a part of the request body. Change if necessary
    // const data = await getDocumentsForSubgoal(req.params.classId, req.body.languageCodes, +req.params.pageNumber);

    let data = await getDocumentsForSubgoal(req.params.classId, langCodes, +req.params.offset);
   
    for (let i = 0; i < data.length; i++) {
      // The language code is the 7th element when splitting the URL on forward slashes
      data[i]['language'] = data[i]['language'].split('/')[6];
    }

    
    // Documents are sorted into arrays of documents by celexID
    // The internal arrays are sorted by language, alphabetically (I think)
    
    let documentsArray: Document[][] = [];
    // To handle edge case that one or more queried language isnt present at all
    let celexIds = new Set(data.map(doc => doc.celexID));

    // Return array
    let langGroupedArray: Document[][][] = [];
   
    // Create celex-grouped temp array
    celexIds.forEach(id => {
      documentsArray.push(data.filter(doc => doc.celexID == id));
    });
    
    // Create prioritized language groupings within each celex group
    for (let celexIndex = 0; celexIndex < documentsArray.length; celexIndex++) {
      let celexGroup: Document[][] = [];

      // Create language groupings by filtering and pushing if the language exists for the given document
      for (let langIndex = 0; langIndex < langCodes.length; langIndex++) {
        let langMatches = documentsArray[celexIndex].filter(doc => doc.language == langCodes[langIndex]);
        if (langMatches.length != 0) celexGroup.push(langMatches);
      }

      // Build up the new array of arrays (of arrays)
      langGroupedArray.push(celexGroup)
    }

    res.json(langGroupedArray);

  } catch (e: any) {
    onError(e, req, res);
  }
}


router.get('/relations/:classId', verifyDatabaseAccess, getRelationsFromClass);
router.get('/subclasses/:classId', verifyDatabaseAccess, getSubclassesFromClass);
router.get('/annotations/:classId', verifyDatabaseAccess, getAnnotationsFromClass);
router.get('/sustainabilityGoals', verifyDatabaseAccess, getSustainabilityGoalsFromOntology);
router.get('/search', verifyDatabaseAccess, regexSearch);
router.get('/contributions/:classId', verifyDatabaseAccess, getContributionsToNodes);
router.get('/tradeoff/:classId', verifyDatabaseAccess, getTradeOffToNodes);
router.get('/developmentarea/:classId', verifyDatabaseAccess, getDevelopmentAreaToNodes);
router.get('/subgoals/:classId', verifyDatabaseAccess, getSubGoalsfromSDG);
router.get('/checkMunicipalityByCode', verifyDatabaseAccess, checkMunicipalityByCode);

router.get('/subgoalDocuments/:classId/:langCodes/:offset', verifyDatabaseAccess, getDocumentsForSubgoalByClassId);

export default router;
