export interface SquirrelInfo {
  id: number;
  firstName: string;
  favoriteColor: string;
}

export interface SquirrelFamily {
  lastName: string;
  members: SquirrelInfo[];
}

export const allFamilies: SquirrelFamily[] = [
  {
    lastName: 'Squirrel',
    members: [
      {
        id: 0,
        firstName: 'Secret',
        favoriteColor: 'red',
      },
      {
        id: 1,
        firstName: 'Rocky',
        favoriteColor: 'blue',
      }
    ]
  },
  {
    lastName: 'Chipmunk',
    members: [
      {
        id: 0,
        firstName: 'Mama',
        favoriteColor: 'purple',
      },
      {
        id: 1,
        firstName: 'Papa',
        favoriteColor: 'cyan',
      },
      {
        id: 2,
        firstName: 'Baby',
        favoriteColor: 'beige',
      }
    ]
  },
  {
    lastName: 'McSquirrel',
    members: [
      {
        id: 0,
        firstName: 'Davis',
        favoriteColor: 'red',
      },
    ]
  },
  {
    lastName: 'Kennedy',
    members: [
      {
        id: 0,
        firstName: 'Jackie',
        favoriteColor: 'grey',
      },
      {
        id: 1,
        firstName: 'John',
        favoriteColor: 'blue',
      },
      {
        id: 2,
        firstName: 'Robert',
        favoriteColor: 'periwinkle',
      }
    ]
  },
];