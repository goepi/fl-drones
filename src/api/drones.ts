export const getRequest = async <T>(path: string): Promise<T> => {
  const response = await fetch(`http://bobs-epic-drone-shack-inc.herokuapp.com${path}`);

  if (response.ok) {
    return await response.json();
  }

  return getRequest(path);
};
