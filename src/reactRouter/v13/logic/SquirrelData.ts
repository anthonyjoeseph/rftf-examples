export interface SquirrelRouteType {
  familyName?: string;
  squirrelID?: string;
}

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
        id: 2,
        firstName: 'Mama',
        favoriteColor: 'purple',
      },
      {
        id: 3,
        firstName: 'Papa',
        favoriteColor: 'cyan',
      },
      {
        id: 4,
        firstName: 'Baby',
        favoriteColor: 'beige',
      }
    ]
  },
  {
    lastName: 'McSquirrel',
    members: [
      {
        id: 5,
        firstName: 'Davis',
        favoriteColor: 'red',
      },
    ]
  },
  {
    lastName: 'Kennedy',
    members: [
      {
        id: 6,
        firstName: 'Jackie',
        favoriteColor: 'grey',
      },
      {
        id: 7,
        firstName: 'John',
        favoriteColor: 'blue',
      },
      {
        id: 8,
        firstName: 'Robert',
        favoriteColor: 'periwinkle',
      }
    ]
  },
];