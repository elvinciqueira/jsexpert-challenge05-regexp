import { TextProcessorFluentApi } from '../src/textProcessorFluentAPI';
import validText from './mock/valid';

describe('TextProcessorFluentApi', () => {
  let textProcessorFluentApi = {};

  beforeEach(() => {
    textProcessorFluentApi = new TextProcessorFluentApi(validText);
  });

  describe('build()', () => {
    test('return text content', () => {
      expect(textProcessorFluentApi.build()).toEqual(validText);
    });
  });

  describe('extractHeader()', () => {
    test('extract headers from the content', () => {
      const expected = {
        headers: 'título;link;autor;etapa;ementa;indexadoresnorma;',
        content: validText,
      };

      expect(textProcessorFluentApi.extractHeaders().build()).toEqual(expected);
    });
  });

  describe('extractContent()', () => {
    test('return content in an array', () => {
      const expected = {
        headers: 'título;link;autor;etapa;ementa;indexadoresnorma;',
        content: [
          'Projeto de lei 584/2016;http://www.al.sp.gov.br/propositura?id=1322563;Jorge Wilson Xerife do Consumidor;PAUTA;Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.;CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO;',
          'Projeto de lei 580/2016;http://www.al.sp.gov.br/propositura?id=1323286;Marcia Lia;PAUTA;Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.;NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA;',
          'Projeto de lei 545/2016;http://www.al.sp.gov.br/propositura?id=1322832;Roberto Morais, Itamar Borges;PAUTA;Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.;',
        ],
      };

      expect(
        textProcessorFluentApi.extractHeaders().extractContent().build()
      ).toEqual(expected);
    });
  });

  describe('splitValues()', () => {
    test('split headers and content into an array', () => {
      const expected = {
        headers: [
          'título',
          'link',
          'autor',
          'etapa',
          'ementa',
          'indexadoresnorma',
        ],
        content: [
          [
            'Projeto de lei 584/2016',
            'http://www.al.sp.gov.br/propositura?id=1322563',
            'Jorge Wilson Xerife do Consumidor',
            'PAUTA',
            'Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.',
            'CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO',
          ],
          [
            'Projeto de lei 580/2016',
            'http://www.al.sp.gov.br/propositura?id=1323286',
            'Marcia Lia',
            'PAUTA',
            'Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.',
            'NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA',
          ],
          [
            'Projeto de lei 545/2016',
            'http://www.al.sp.gov.br/propositura?id=1322832',
            'Roberto Morais, Itamar Borges',
            'PAUTA',
            'Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.',
          ],
        ],
      };

      expect(
        textProcessorFluentApi
          .extractHeaders()
          .extractContent()
          .splitValues()
          .build()
      ).toEqual(expected);
    });
  });

  describe('mapRawObject()', () => {
    test('normalize headers and content into an array of object', () => {
      const expected = [
        {
          título: 'Projeto de lei 584/2016',
          link: 'http://www.al.sp.gov.br/propositura?id=1322563',
          autor: 'Jorge Wilson Xerife do Consumidor',
          etapa: 'PAUTA',
          ementa:
            'Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.',
          indexadoresnorma:
            'CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO',
        },
        {
          título: 'Projeto de lei 580/2016',
          link: 'http://www.al.sp.gov.br/propositura?id=1323286',
          autor: 'Marcia Lia',
          etapa: 'PAUTA',
          ementa:
            'Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.',
          indexadoresnorma:
            'NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA',
        },
        {
          título: 'Projeto de lei 545/2016',
          link: 'http://www.al.sp.gov.br/propositura?id=1322832',
          autor: 'Roberto Morais, Itamar Borges',
          etapa: 'PAUTA',
          ementa:
            'Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.',
        },
      ];

      expect(
        textProcessorFluentApi
          .extractHeaders()
          .extractContent()
          .splitValues()
          .mapRawObject()
          .build()
      ).toEqual(expected);
    });
  });

  describe('mapProjects()', () => {
    test('normalize content into projects object', () => {
      const expected = [
        {
          id: '1322563',
          numero: '584',
          ano: '2016',
          autores: [
            {
              nome: 'Jorge Consumidor',
            },
          ],
          url: 'http://www.al.sp.gov.br/propositura?id=1322563',
          indexadores: [
            'CONTRATO',
            'OBRIGATORIEDADE',
            'CLÁUSULA',
            'SERVIÇO',
            'TELEFONIA MÓVEL',
            'TELEFONIA FIXA',
            'PRAZO',
            'INCLUSÃO',
            'RESCISÃO CONTRATUAL',
            'LIBERAÇÃO',
          ],
        },
        {
          id: '1323286',
          numero: '580',
          ano: '2016',
          autores: [
            {
              nome: 'Marcia Lia',
            },
          ],
          url: 'http://www.al.sp.gov.br/propositura?id=1323286',
          indexadores: [
            'NORMAS',
            'REALIZAÇÃO',
            'CONCURSO PÚBLICO ESTADUAL',
            'ESTADO DE SÃO PAULO',
            'ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA',
          ],
        },
        {
          id: '1322832',
          numero: '545',
          ano: '2016',
          autores: [{ nome: 'Roberto Morais' }, { nome: 'Itamar Borges' }],
          url: 'http://www.al.sp.gov.br/propositura?id=1322832',
          indexadores: [],
        },
      ];

      expect(
        textProcessorFluentApi
          .extractHeaders()
          .extractContent()
          .splitValues()
          .mapRawObject()
          .mapProjects()
          .build()
      ).toEqual(expected);
    });
  });
});
