import { createNamespace } from "./namespace.ts";

export default createNamespace(
  {
    iri: "http://www.w3.org/2004/02/skos/core#",
    prefix: "skos:",
    terms: [
      "Collection",
      "Concept",
      "ConceptScheme",
      "OrderedCollection",
      "altLabel",
      "broadMatch",
      "broader",
      "broaderTransitive",
      "changeNote",
      "closeMatch",
      "definition",
      "editorialNote",
      "exactMatch",
      "example",
      "hasTopConcept",
      "hiddenLabel",
      "historyNote",
      "inScheme",
      "mappingRelation",
      "member",
      "memberList",
      "narrowMatch",
      "narrower",
      "narrowerTransitive",
      "notation",
      "note",
      "prefLabel",
      "related",
      "relatedMatch",
      "scopeNote",
      "semanticRelation",
      "topConceptOf",
    ],
  } as const,
);
