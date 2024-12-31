import domTestingLib from '@testing-library/dom';
const { queryHelpers } = domTestingLib;

export const queryByQueryId = queryHelpers.queryByAttribute.bind(
  null,
  'query-id',
);

export const queryAllByQueryId = queryHelpers.queryAllByAttribute.bind(
  null,
  'query-id',
);

export function getAllByQueryId(container: HTMLElement, id: string) {
  const els = queryAllByQueryId(container, id);
  if (!els.length) {
    throw queryHelpers.getElementError(
      `Unable to find an element by: [data-test-id="${id}"]`,
      container,
    );
  }
  return els;
}

export function getByQueryId(container: HTMLElement, id: string) {
  // result >= 1
  const result = getAllByQueryId(container, id);
  if (result.length > 1) {
    throw queryHelpers.getElementError(
      `Found multiple elements with the [data-test-id="${id}"]`,
      container,
    );
  }
  return result[0];
}
