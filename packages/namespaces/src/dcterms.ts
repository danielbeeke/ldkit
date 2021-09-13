import { createNamespace } from "./namespace";

export default createNamespace({
  iri: "http://purl.org/dc/terms/",
  prefix: "dcterms:",
  terms: [
    "Agent",
    "AgentClass",
    "BibliographicResource",
    "Box",
    "DCMIType",
    "DDC",
    "FileFormat",
    "Frequency",
    "IMT",
    "ISO3166",
    "ISO639-2",
    "ISO639-3",
    "Jurisdiction",
    "LCC",
    "LCSH",
    "LicenseDocument",
    "LinguisticSystem",
    "Location",
    "LocationPeriodOrJurisdiction",
    "MESH",
    "MediaType",
    "MediaTypeOrExtent",
    "MethodOfAccrual",
    "MethodOfInstruction",
    "NLM",
    "Period",
    "PeriodOfTime",
    "PhysicalMedium",
    "PhysicalResource",
    "Point",
    "Policy",
    "ProvenanceStatement",
    "RFC1766",
    "RFC3066",
    "RFC4646",
    "RFC5646",
    "RightsStatement",
    "SizeOrDuration",
    "Standard",
    "TGN",
    "UDC",
    "URI",
    "W3CDTF",
    "abstract",
    "accessRights",
    "accrualMethod",
    "accrualPeriodicity",
    "accrualPolicy",
    "alternative",
    "audience",
    "available",
    "bibliographicCitation",
    "conformsTo",
    "contributor",
    "coverage",
    "created",
    "creator",
    "date",
    "dateAccepted",
    "dateCopyrighted",
    "dateSubmitted",
    "description",
    "educationLevel",
    "extent",
    "format",
    "hasFormat",
    "hasPart",
    "hasVersion",
    "identifier",
    "instructionalMethod",
    "isFormatOf",
    "isPartOf",
    "isReferencedBy",
    "isReplacedBy",
    "isRequiredBy",
    "isVersionOf",
    "issued",
    "language",
    "license",
    "mediator",
    "medium",
    "modified",
    "provenance",
    "publisher",
    "references",
    "relation",
    "replaces",
    "requires",
    "rights",
    "rightsHolder",
    "source",
    "spatial",
    "subject",
    "tableOfContents",
    "temporal",
    "title",
    "type",
    "valid",
  ],
} as const);
