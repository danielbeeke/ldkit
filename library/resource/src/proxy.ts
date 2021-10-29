import type { Iri } from "./iri";
import type { Property, Schema } from "@ldkit/schema";
import { fromRdf, Graph, NamedNode, Term } from "@ldkit/rdf";

type EntityData = {
  schema: Schema;
  graph: Graph;
  pointer: Iri;
};

const resolveTerm = (term: Term) => {
  if (term.termType === "NamedNode") {
    return term.value;
  } else if (term.termType === "Literal") {
    return fromRdf(term);
  } else {
    throw new Error(`Unsupported term type to resolve: ${term.termType}`);
  }
};

const proxyHandler = {
  get: (target: EntityData, propertyAlias: string): any => {
    console.warn("PROXY GET", target.pointer, target.graph, propertyAlias);

    const targetSchema = target.schema;
    const targetObject = target.graph[target.pointer];

    if (propertyAlias === "@id") {
      return target.pointer;
    }

    if (!targetSchema[propertyAlias]) {
      throw new Error(
        `Unknown property ${propertyAlias} in schema of ${targetSchema["@type"]}`
      );
    }
    const property = targetSchema[propertyAlias] as Property;

    const proxyValue = targetObject[property["@id"]];
    if (property["@context"]) {
      if (property["@meta"].includes("@array")) {
        // We have an array!
        console.log("ARRAY HIT", propertyAlias);
        if (!proxyValue) {
          return [];
        }
        return proxyValue.map((value) => {
          console.log(value);
          return new Proxy(
            {
              schema: property["@context"]!,
              graph: target.graph,
              pointer: (value as NamedNode).value,
            },
            proxyHandler
          );
        });
      } else {
        // Single value
        // console.log("SINGLE HIT", propertyAlias);
        return new Proxy(
          {
            schema: property["@context"]!,
            graph: target.graph,
            pointer: (proxyValue[0] as NamedNode).value,
          },
          proxyHandler
        );
      }
    }
    if (!proxyValue) {
      // No triple within the subgraph exists with the property alias
      return null;
    }
    if (property["@meta"].includes("@array")) {
      // console.log("ARRAY", proxyValue);
      return proxyValue.map(resolveTerm);
    } else {
      // console.log("SINGLE", proxyValue);
      return resolveTerm(
        Array.isArray(proxyValue) ? proxyValue[0] : proxyValue
      );
    }
  },
};

export const createProxy = (schema: Schema, graph: Graph, pointer: Iri) => {
  const target = {
    schema,
    graph,
    pointer,
  };
  return new Proxy(target, proxyHandler);
};
