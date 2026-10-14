export type CountryCode = 'IT';

export type CountryForm = {
  id: CountryCode;
  code: CountryCode;
  name: string;
  flag: string;
  templateUrl: string;
  templateName: string;
  agreementUrl: string;
  documentHint: string;
};

export const countries: Array<CountryForm> = [
  {
    id: 'IT',
    code: 'IT',
    name: 'Италия',
    flag: '🇮🇹',
    templateUrl: '/countries/it/formulario-visti.pdf',
    templateName: 'Modulo armonizzato per la domanda di visto Schengen',
    agreementUrl: '/agreements/personal-data.pdf',
    documentHint:
      'Анкета заполняется по паспорту, вашей форме и бронированию. Паспорт РФ нужен для согласия.',
  },
];

export function getCountry(code: string | null): CountryForm | undefined {
  return countries.find((country) => country.id === code);
}
