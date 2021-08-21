export const getCountries = async () => Promise.resolve({
  Testing1: {
    All: {
      confirmed: 5,
      country: 'Testing1',
    },
  },
  Testing2: {
    All: {
      confirmed: 8,
      country: 'Testing2',
    },
  },
});

export const getCountry = async (name) => Promise.resolve({
  All: {
    confirmed: 3,
    country: name,
  },
  Testing3: {
    confirmed: 4,
  },
});
