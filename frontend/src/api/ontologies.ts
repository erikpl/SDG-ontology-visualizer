import { Annotation, SustainabilityGoal, Node, Ontology, SubGoal, Document } from '../types/ontologyTypes';
import api from './api';

export const getRelations = async (nodeId: string): Promise<Array<Ontology>> => {
  try {
    const data: Array<Ontology> = await api.GET(
      `ontologies/relations/${encodeURIComponent(nodeId)}`,
    );
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getAnnotations = async (nodeId: string): Promise<Annotation> => {
  try {
    const data: Promise<Annotation> = await api.GET(
      `ontologies/annotations/${encodeURIComponent(nodeId)}`,
    );
    return await data;
  } catch (e) {
    console.log(e);
    return { label: '', description: '', moreInformation: '' };
  }
};

export const getSubclasses = async (nodeId: string): Promise<Array<Node>> => {
  try {
    const data: Array<Node> = await api.GET(`ontologies/subclasses/${encodeURIComponent(nodeId)}`);
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getDocumentsForSubgoal = async (subgoalname: string, langList: Array<string>, pageNumber: number): Promise<Array<Array<Array<Document>>>> => {
  try {
    const URI = `${subgoalname}/${langList.toString()}/${pageNumber.toString()}`;
    const data: Array<Array<Array<Document>>> = await api.GET(`ontologies/subgoalDocuments/http%3A%2F%2Fwww.semanticweb.org%2Faga%2Fontologies%2F2017%2F9%2FSDG%23${encodeURI(URI)}`);
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getRelatedSubgoalsForDocument = async (documentURL: string): Promise<Array<Array<SubGoal>>> => {
  try {
    const docID = documentURL.slice(documentURL.indexOf('cellar/') + 7, documentURL.lastIndexOf('/'));
    let data: Array<Node> = await api.GET(`ontologies/relatedSubgoalsForDocument/http%3A%2F%2Fwww.semanticweb.org%2Faga%2Fontologies%2F2017%2F9%2FSDG%23documents.${docID}`);
    
    data = data.filter(node => !(node as SubGoal).Subject.startsWith('http://metadata.un.org/sdg/'));
    
    const subgoalArrays: Array<Array<SubGoal>> = [];

    for (let i = 1; i < 18; i += 1) {
      const matches = data.filter(node => (node as SubGoal).SubjectLabel.slice(0, (node as SubGoal).SubjectLabel.indexOf('.')) === i.toString());
      if (matches.length > 0)
        subgoalArrays.push(matches.map(node => node as SubGoal));
    }

    return subgoalArrays;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getSustainabilityGoals = async (): Promise<Array<SustainabilityGoal>> => {
  try {
    const data = await api.GET('ontologies/sustainabilityGoals');
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getSustainabilityGoal = async (goalID: string): Promise<Array<SustainabilityGoal>> => {
  try {
    const data = await api.GET(`ontologies/sustainabilityGoals/${goalID}`);
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getContributions = async (nodeId: string): Promise<Array<Node>> => {
  try {
    const data: Array<Node> = await api.GET(
      `ontologies/contributions/${encodeURIComponent(nodeId)}`,
    );
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const search = async (searchTerm: string, limit?: number): Promise<Array<Node>> => {
  let url = `ontologies/search?search=${encodeURIComponent(searchTerm)}`;
  if (limit) {
    url += `&limit=${limit}`;
  }
  try {
    const data: Array<Node> = await api.GET(url);
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getTradeOff = async (nodeId: string): Promise<Array<Node>> => {
  try {
    const data: Array<Node> = await api.GET(`ontologies/tradeoff/${encodeURIComponent(nodeId)}`);
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getDevelopmentArea = async (nodeId: string): Promise<Array<Node>> => {
  try {
    const data: Array<Node> = await api.GET(
      `ontologies/developmentarea/${encodeURIComponent(nodeId)}`,
    );
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getSubGoals = async (nodeId: string): Promise<Array<SubGoal>> => {
  try {
    let data: Array<SubGoal> = await api.GET(`ontologies/subgoals/${encodeURIComponent(nodeId)}`);

    data = data.filter(node => !(node as SubGoal).Subject.startsWith('http://metadata.un.org/sdg/'));
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

