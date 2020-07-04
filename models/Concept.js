// @flow
import type { ConceptType } from '../types/ConceptType';

export const CONCEPTS: Array<ConceptType> = [
{text: "Allele", definition: "An allele is a variant form of a given gene,[4] meaning it is one of two or more versions of a known mutation at the same place on a chromosome", aliases: ["Alleles"]},
{text: "Gene", definition: "A gene is a sequence of nucleotides in DNA or RNA that encodes the synthesis of a gene product, either RNA or protein", aliases: ["Genes"]},
{text: "Genotype", definition: "A genotype is an organism’s complete set of heritable genes, or genes that can be passed down from parents to offspring.", aliases: []},
].map(({ text, definition, aliases }, id) => {
  return {id, text, definition, aliases};
});

export function ConceptByText(text: string): ConceptType {
  let concept = CONCEPTS.find((concept) => concept.text === text || concept.aliases.includes(text)) 
  if (concept == null) {
    return CreateConceptByText(text);
  } else {
    concept.text = text;
    return concept;
  }
};

export function ConceptByID(id: number): ?ConceptType {
  return CONCEPTS.find((concept) => concept.id === id) ?? null;
};

export function CreateConceptByText(text: string): ConceptType {
  return {id: -1, text, definition: "", aliases: []};
}

export function ConceptsByText(text: string): Array<ConceptType> {
  return CONCEPTS.filter((concept) => concept.text.toLowerCase().startsWith(text.toLowerCase()));
};
