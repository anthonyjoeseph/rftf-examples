export interface SquirrelStuff {
  id: number;
  name: string;
}

export const getSquirrelFromREST = (): Promise<SquirrelStuff> => Promise.resolve({
  id: 42,
  name: 'Secret Squirrel'
});

export const getNutErrorFromREST = (): Promise<SquirrelStuff> => Promise.reject(
  new Error('Hard nut to crack'),
);

export const getTreeErrorFromREST = (): Promise<SquirrelStuff> => Promise.reject(
  new Error('Tree fell down'),
);