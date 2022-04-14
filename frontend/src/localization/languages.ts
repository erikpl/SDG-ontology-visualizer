import { LanguageItem, ISO6392TCode, ISO6391Code } from '../types/ontologyTypes';

const LanguagesList: LanguageItem[] = [
    { id: 0, ISO_639_1: ISO6391Code.no, ISO_639_2T: ISO6392TCode.NOR, ISO_3166_1: 'NO' },
    { id: 1, ISO_639_1: ISO6391Code.fr, ISO_639_2T: ISO6392TCode.FRA, ISO_3166_1: 'FR' },
    { id: 2, ISO_639_1: ISO6391Code.en, ISO_639_2T: ISO6392TCode.ENG, ISO_3166_1: 'GB' },
    { id: 3, ISO_639_1: ISO6391Code.de, ISO_639_2T: ISO6392TCode.DEU, ISO_3166_1: 'DE' },
    { id: 4, ISO_639_1: ISO6391Code.pt, ISO_639_2T: ISO6392TCode.POR, ISO_3166_1: 'PT' },
    { id: 5, ISO_639_1: ISO6391Code.es, ISO_639_2T: ISO6392TCode.SPA, ISO_3166_1: 'ES' },
    { id: 6, ISO_639_1: ISO6391Code.bg, ISO_639_2T: ISO6392TCode.BUL, ISO_3166_1: 'BG' },
    { id: 7, ISO_639_1: ISO6391Code.cs, ISO_639_2T: ISO6392TCode.CES, ISO_3166_1: 'CZ' },
    { id: 8, ISO_639_1: ISO6391Code.da, ISO_639_2T: ISO6392TCode.DAN, ISO_3166_1: 'DK' },
    { id: 9, ISO_639_1: ISO6391Code.el, ISO_639_2T: ISO6392TCode.ELL, ISO_3166_1: 'GR' },
    { id: 10, ISO_639_1: ISO6391Code.et, ISO_639_2T: ISO6392TCode.EST, ISO_3166_1: 'EE' },
    { id: 11, ISO_639_1: ISO6391Code.fi, ISO_639_2T: ISO6392TCode.FIN, ISO_3166_1: 'FI' },
    { id: 12, ISO_639_1: ISO6391Code.ga, ISO_639_2T: ISO6392TCode.GLE, ISO_3166_1: 'IE' },
    { id: 13, ISO_639_1: ISO6391Code.hr, ISO_639_2T: ISO6392TCode.HRV, ISO_3166_1: 'HR' },
    { id: 14, ISO_639_1: ISO6391Code.hu, ISO_639_2T: ISO6392TCode.HUN, ISO_3166_1: 'HU' },
    { id: 15, ISO_639_1: ISO6391Code.it, ISO_639_2T: ISO6392TCode.ITA, ISO_3166_1: 'IT' },
    { id: 16, ISO_639_1: ISO6391Code.lt, ISO_639_2T: ISO6392TCode.LIT, ISO_3166_1: 'LT' },
    { id: 17, ISO_639_1: ISO6391Code.lv, ISO_639_2T: ISO6392TCode.LAV, ISO_3166_1: 'LV' },
    { id: 18, ISO_639_1: ISO6391Code.mt, ISO_639_2T: ISO6392TCode.MLT, ISO_3166_1: 'MT' },
    { id: 19, ISO_639_1: ISO6391Code.nl, ISO_639_2T: ISO6392TCode.NLD, ISO_3166_1: 'NL' },
    { id: 20, ISO_639_1: ISO6391Code.pl, ISO_639_2T: ISO6392TCode.POL, ISO_3166_1: 'PL' },
    { id: 21, ISO_639_1: ISO6391Code.ro, ISO_639_2T: ISO6392TCode.RON, ISO_3166_1: 'RO' },
    { id: 22, ISO_639_1: ISO6391Code.sk, ISO_639_2T: ISO6392TCode.SLK, ISO_3166_1: 'SK' },
    { id: 23, ISO_639_1: ISO6391Code.sl, ISO_639_2T: ISO6392TCode.SLV, ISO_3166_1: 'SI' },
    { id: 24, ISO_639_1: ISO6391Code.sv, ISO_639_2T: ISO6392TCode.SWE, ISO_3166_1: 'SE' },
];

export default LanguagesList;