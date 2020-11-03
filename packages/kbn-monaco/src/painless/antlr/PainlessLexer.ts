// Generated from ./PainlessLexer.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
// import { NotNull } from "antlr4ts/Decorators";
// import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class PainlessLexer extends Lexer {
	public static readonly WS = 1;
	public static readonly COMMENT = 2;
	public static readonly LBRACK = 3;
	public static readonly RBRACK = 4;
	public static readonly LBRACE = 5;
	public static readonly RBRACE = 6;
	public static readonly LP = 7;
	public static readonly RP = 8;
	public static readonly DOT = 9;
	public static readonly NSDOT = 10;
	public static readonly COMMA = 11;
	public static readonly SEMICOLON = 12;
	public static readonly IF = 13;
	public static readonly IN = 14;
	public static readonly ELSE = 15;
	public static readonly WHILE = 16;
	public static readonly DO = 17;
	public static readonly FOR = 18;
	public static readonly CONTINUE = 19;
	public static readonly BREAK = 20;
	public static readonly RETURN = 21;
	public static readonly NEW = 22;
	public static readonly TRY = 23;
	public static readonly CATCH = 24;
	public static readonly THROW = 25;
	public static readonly THIS = 26;
	public static readonly INSTANCEOF = 27;
	public static readonly BOOLNOT = 28;
	public static readonly BWNOT = 29;
	public static readonly MUL = 30;
	public static readonly DIV = 31;
	public static readonly REM = 32;
	public static readonly ADD = 33;
	public static readonly SUB = 34;
	public static readonly LSH = 35;
	public static readonly RSH = 36;
	public static readonly USH = 37;
	public static readonly LT = 38;
	public static readonly LTE = 39;
	public static readonly GT = 40;
	public static readonly GTE = 41;
	public static readonly EQ = 42;
	public static readonly EQR = 43;
	public static readonly NE = 44;
	public static readonly NER = 45;
	public static readonly BWAND = 46;
	public static readonly XOR = 47;
	public static readonly BWOR = 48;
	public static readonly BOOLAND = 49;
	public static readonly BOOLOR = 50;
	public static readonly COND = 51;
	public static readonly COLON = 52;
	public static readonly ELVIS = 53;
	public static readonly REF = 54;
	public static readonly ARROW = 55;
	public static readonly FIND = 56;
	public static readonly MATCH = 57;
	public static readonly INCR = 58;
	public static readonly DECR = 59;
	public static readonly ASSIGN = 60;
	public static readonly AADD = 61;
	public static readonly ASUB = 62;
	public static readonly AMUL = 63;
	public static readonly ADIV = 64;
	public static readonly AREM = 65;
	public static readonly AAND = 66;
	public static readonly AXOR = 67;
	public static readonly AOR = 68;
	public static readonly ALSH = 69;
	public static readonly ARSH = 70;
	public static readonly AUSH = 71;
	public static readonly OCTAL = 72;
	public static readonly HEX = 73;
	public static readonly INTEGER = 74;
	public static readonly DECIMAL = 75;
	public static readonly STRING = 76;
	public static readonly REGEX = 77;
	public static readonly TRUE = 78;
	public static readonly FALSE = 79;
	public static readonly NULL = 80;
	public static readonly PRIMITIVE = 81;
	public static readonly DEF = 82;
	public static readonly ID = 83;
	public static readonly DOTINTEGER = 84;
	public static readonly DOTID = 85;
	public static readonly AFTER_DOT = 1;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE", "AFTER_DOT",
	];

	public static readonly ruleNames: string[] = [
		"WS", "COMMENT", "LBRACK", "RBRACK", "LBRACE", "RBRACE", "LP", "RP", "DOT",
		"NSDOT", "COMMA", "SEMICOLON", "IF", "IN", "ELSE", "WHILE", "DO", "FOR",
		"CONTINUE", "BREAK", "RETURN", "NEW", "TRY", "CATCH", "THROW", "THIS",
		"INSTANCEOF", "BOOLNOT", "BWNOT", "MUL", "DIV", "REM", "ADD", "SUB", "LSH",
		"RSH", "USH", "LT", "LTE", "GT", "GTE", "EQ", "EQR", "NE", "NER", "BWAND",
		"XOR", "BWOR", "BOOLAND", "BOOLOR", "COND", "COLON", "ELVIS", "REF", "ARROW",
		"FIND", "MATCH", "INCR", "DECR", "ASSIGN", "AADD", "ASUB", "AMUL", "ADIV",
		"AREM", "AAND", "AXOR", "AOR", "ALSH", "ARSH", "AUSH", "OCTAL", "HEX",
		"INTEGER", "DECIMAL", "STRING", "REGEX", "TRUE", "FALSE", "NULL", "PRIMITIVE",
		"DEF", "ID", "DOTINTEGER", "DOTID",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, "'{'", "'}'", "'['", "']'", "'('", "')'",
		"'.'", "'?.'", "','", "';'", "'if'", "'in'", "'else'", "'while'", "'do'",
		"'for'", "'continue'", "'break'", "'return'", "'new'", "'try'", "'catch'",
		"'throw'", "'this'", "'instanceof'", "'!'", "'~'", "'*'", "'/'", "'%'",
		"'+'", "'-'", "'<<'", "'>>'", "'>>>'", "'<'", "'<='", "'>'", "'>='", "'=='",
		"'==='", "'!='", "'!=='", "'&'", "'^'", "'|'", "'&&'", "'||'", "'?'",
		"':'", "'?:'", "'::'", "'->'", "'=~'", "'==~'", "'++'", "'--'", "'='",
		"'+='", "'-='", "'*='", "'/='", "'%='", "'&='", "'^='", "'|='", "'<<='",
		"'>>='", "'>>>='", undefined, undefined, undefined, undefined, undefined,
		undefined, "'true'", "'false'", "'null'", undefined, "'def'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "WS", "COMMENT", "LBRACK", "RBRACK", "LBRACE", "RBRACE", "LP",
		"RP", "DOT", "NSDOT", "COMMA", "SEMICOLON", "IF", "IN", "ELSE", "WHILE",
		"DO", "FOR", "CONTINUE", "BREAK", "RETURN", "NEW", "TRY", "CATCH", "THROW",
		"THIS", "INSTANCEOF", "BOOLNOT", "BWNOT", "MUL", "DIV", "REM", "ADD",
		"SUB", "LSH", "RSH", "USH", "LT", "LTE", "GT", "GTE", "EQ", "EQR", "NE",
		"NER", "BWAND", "XOR", "BWOR", "BOOLAND", "BOOLOR", "COND", "COLON", "ELVIS",
		"REF", "ARROW", "FIND", "MATCH", "INCR", "DECR", "ASSIGN", "AADD", "ASUB",
		"AMUL", "ADIV", "AREM", "AAND", "AXOR", "AOR", "ALSH", "ARSH", "AUSH",
		"OCTAL", "HEX", "INTEGER", "DECIMAL", "STRING", "REGEX", "TRUE", "FALSE",
		"NULL", "PRIMITIVE", "DEF", "ID", "DOTINTEGER", "DOTID",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(PainlessLexer._LITERAL_NAMES, PainlessLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return PainlessLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	/** Is the preceding {@code /} a the beginning of a regex (true) or a division (false). */
	isSlashRegex(): boolean {
    const lastToken = super.nextToken();

    if (lastToken == null) {
        return true;
    }

    // @ts-ignore
    switch (lastToken._type) {
      case PainlessLexer.RBRACE:
      case PainlessLexer.RP:
      case PainlessLexer.OCTAL:
      case PainlessLexer.HEX:
      case PainlessLexer.INTEGER:
      case PainlessLexer.DECIMAL:
      case PainlessLexer.ID:
      case PainlessLexer.DOTINTEGER:
      case PainlessLexer.DOTID:
          return false;
      default:
          return true;
      }
  }


	constructor(input: CharStream) {
    super(input);
    this._interp = new LexerATNSimulator(PainlessLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "PainlessLexer.g4"; }

	// @Override
	public get ruleNames(): string[] { return PainlessLexer.ruleNames; }

	// @Override
	// public get serializedATN(): string { return PainlessLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return PainlessLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return PainlessLexer.modeNames; }

	// @Override
	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 30:
			return this.DIV_sempred(_localctx, predIndex);

		case 76:
			return this.REGEX_sempred(_localctx, predIndex);
		}
		return true;
	}
	private DIV_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return  this.isSlashRegex() == false ;
		}
		return true;
	}
	private REGEX_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return  this.isSlashRegex() ;
		}
		return true;
	}

	// private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02W\u027A\b\x01" +
		"\b\x01\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06" +
		"\t\x06\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f" +
		"\x04\r\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04" +
		"\x12\t\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04" +
		"\x17\t\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04" +
		"\x1C\t\x1C\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04" +
		"\"\t\"\x04#\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*" +
		"\t*\x04+\t+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x04" +
		"3\t3\x044\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04" +
		"<\t<\x04=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04" +
		"E\tE\x04F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04" +
		"N\tN\x04O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x03" +
		"\x02\x06\x02\xB0\n\x02\r\x02\x0E\x02\xB1\x03\x02\x03\x02\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x07\x03\xBA\n\x03\f\x03\x0E\x03\xBD\v\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x07\x03\xC4\n\x03\f\x03\x0E\x03\xC7\v\x03" +
		"\x03\x03\x03\x03\x05\x03\xCB\n\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03" +
		"\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03" +
		"\n\x03\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x03\r\x03" +
		"\r\x03\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03" +
		"\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03" +
		"\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03" +
		"\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03" +
		"\x15\x03\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x17\x03\x17\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18\x03" +
		"\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x1A\x03\x1A\x03" +
		"\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03" +
		"\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03" +
		"\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x03 \x03" +
		" \x03 \x03!\x03!\x03\"\x03\"\x03#\x03#\x03$\x03$\x03$\x03%\x03%\x03%\x03" +
		"&\x03&\x03&\x03&\x03\'\x03\'\x03(\x03(\x03(\x03)\x03)\x03*\x03*\x03*\x03" +
		"+\x03+\x03+\x03,\x03,\x03,\x03,\x03-\x03-\x03-\x03.\x03.\x03.\x03.\x03" +
		"/\x03/\x030\x030\x031\x031\x032\x032\x032\x033\x033\x033\x034\x034\x03" +
		"5\x035\x036\x036\x036\x037\x037\x037\x038\x038\x038\x039\x039\x039\x03" +
		":\x03:\x03:\x03:\x03;\x03;\x03;\x03<\x03<\x03<\x03=\x03=\x03>\x03>\x03" +
		">\x03?\x03?\x03?\x03@\x03@\x03@\x03A\x03A\x03A\x03B\x03B\x03B\x03C\x03" +
		"C\x03C\x03D\x03D\x03D\x03E\x03E\x03E\x03F\x03F\x03F\x03F\x03G\x03G\x03" +
		"G\x03G\x03H\x03H\x03H\x03H\x03H\x03I\x03I\x06I\u01BA\nI\rI\x0EI\u01BB" +
		"\x03I\x05I\u01BF\nI\x03J\x03J\x03J\x06J\u01C4\nJ\rJ\x0EJ\u01C5\x03J\x05" +
		"J\u01C9\nJ\x03K\x03K\x03K\x07K\u01CE\nK\fK\x0EK\u01D1\vK\x05K\u01D3\n" +
		"K\x03K\x05K\u01D6\nK\x03L\x03L\x03L\x07L\u01DB\nL\fL\x0EL\u01DE\vL\x05" +
		"L\u01E0\nL\x03L\x03L\x06L\u01E4\nL\rL\x0EL\u01E5\x05L\u01E8\nL\x03L\x03" +
		"L\x05L\u01EC\nL\x03L\x06L\u01EF\nL\rL\x0EL\u01F0\x05L\u01F3\nL\x03L\x05" +
		"L\u01F6\nL\x03M\x03M\x03M\x03M\x03M\x03M\x07M\u01FE\nM\fM\x0EM\u0201\v" +
		"M\x03M\x03M\x03M\x03M\x03M\x03M\x03M\x07M\u020A\nM\fM\x0EM\u020D\vM\x03" +
		"M\x05M\u0210\nM\x03N\x03N\x03N\x03N\x06N\u0216\nN\rN\x0EN\u0217\x03N\x03" +
		"N\x07N\u021C\nN\fN\x0EN\u021F\vN\x03N\x03N\x03O\x03O\x03O\x03O\x03O\x03" +
		"P\x03P\x03P\x03P\x03P\x03P\x03Q\x03Q\x03Q\x03Q\x03Q\x03R\x03R\x03R\x03" +
		"R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03" +
		"R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03" +
		"R\x03R\x03R\x03R\x03R\x03R\x03R\x05R\u0259\nR\x03S\x03S\x03S\x03S\x03" +
		"T\x03T\x07T\u0261\nT\fT\x0ET\u0264\vT\x03U\x03U\x03U\x07U\u0269\nU\fU" +
		"\x0EU\u026C\vU\x05U\u026E\nU\x03U\x03U\x03V\x03V\x07V\u0274\nV\fV\x0E" +
		"V\u0277\vV\x03V\x03V\x07\xBB\xC5\u01FF\u020B\u0217\x02\x02W\x04\x02\x03" +
		"\x06\x02\x04\b\x02\x05\n\x02\x06\f\x02\x07\x0E\x02\b\x10\x02\t\x12\x02" +
		"\n\x14\x02\v\x16\x02\f\x18\x02\r\x1A\x02\x0E\x1C\x02\x0F\x1E\x02\x10 " +
		"\x02\x11\"\x02\x12$\x02\x13&\x02\x14(\x02\x15*\x02\x16,\x02\x17.\x02\x18" +
		"0\x02\x192\x02\x1A4\x02\x1B6\x02\x1C8\x02\x1D:\x02\x1E<\x02\x1F>\x02 " +
		"@\x02!B\x02\"D\x02#F\x02$H\x02%J\x02&L\x02\'N\x02(P\x02)R\x02*T\x02+V" +
		"\x02,X\x02-Z\x02.\\\x02/^\x020`\x021b\x022d\x023f\x024h\x025j\x026l\x02" +
		"7n\x028p\x029r\x02:t\x02;v\x02<x\x02=z\x02>|\x02?~\x02@\x80\x02A\x82\x02" +
		"B\x84\x02C\x86\x02D\x88\x02E\x8A\x02F\x8C\x02G\x8E\x02H\x90\x02I\x92\x02" +
		"J\x94\x02K\x96\x02L\x98\x02M\x9A\x02N\x9C\x02O\x9E\x02P\xA0\x02Q\xA2\x02" +
		"R\xA4\x02S\xA6\x02T\xA8\x02U\xAA\x02V\xAC\x02W\x04\x02\x03\x15\x05\x02" +
		"\v\f\x0F\x0F\"\"\x04\x02\f\f\x0F\x0F\x03\x0229\x04\x02NNnn\x04\x02ZZz" +
		"z\x05\x022;CHch\x03\x023;\x03\x022;\b\x02FFHHNNffhhnn\x04\x02GGgg\x04" +
		"\x02--//\x06\x02FFHHffhh\x04\x02$$^^\x04\x02))^^\x03\x02\f\f\x04\x02\f" +
		"\f11\t\x02WWeekknouuwwzz\x05\x02C\\aac|\x06\x022;C\\aac|\x02\u02A0\x02" +
		"\x04\x03\x02\x02\x02\x02\x06\x03\x02\x02\x02\x02\b\x03\x02\x02\x02\x02" +
		"\n\x03\x02\x02\x02\x02\f\x03\x02\x02\x02\x02\x0E\x03\x02\x02\x02\x02\x10" +
		"\x03\x02\x02\x02\x02\x12\x03\x02\x02\x02\x02\x14\x03\x02\x02\x02\x02\x16" +
		"\x03\x02\x02\x02\x02\x18\x03\x02\x02\x02\x02\x1A\x03\x02\x02\x02\x02\x1C" +
		"\x03\x02\x02\x02\x02\x1E\x03\x02\x02\x02\x02 \x03\x02\x02\x02\x02\"\x03" +
		"\x02\x02\x02\x02$\x03\x02\x02\x02\x02&\x03\x02\x02\x02\x02(\x03\x02\x02" +
		"\x02\x02*\x03\x02\x02\x02\x02,\x03\x02\x02\x02\x02.\x03\x02\x02\x02\x02" +
		"0\x03\x02\x02\x02\x022\x03\x02\x02\x02\x024\x03\x02\x02\x02\x026\x03\x02" +
		"\x02\x02\x028\x03\x02\x02\x02\x02:\x03\x02\x02\x02\x02<\x03\x02\x02\x02" +
		"\x02>\x03\x02\x02\x02\x02@\x03\x02\x02\x02\x02B\x03\x02\x02\x02\x02D\x03" +
		"\x02\x02\x02\x02F\x03\x02\x02\x02\x02H\x03\x02\x02\x02\x02J\x03\x02\x02" +
		"\x02\x02L\x03\x02\x02\x02\x02N\x03\x02\x02\x02\x02P\x03\x02\x02\x02\x02" +
		"R\x03\x02\x02\x02\x02T\x03\x02\x02\x02\x02V\x03\x02\x02\x02\x02X\x03\x02" +
		"\x02\x02\x02Z\x03\x02\x02\x02\x02\\\x03\x02\x02\x02\x02^\x03\x02\x02\x02" +
		"\x02`\x03\x02\x02\x02\x02b\x03\x02\x02\x02\x02d\x03\x02\x02\x02\x02f\x03" +
		"\x02\x02\x02\x02h\x03\x02\x02\x02\x02j\x03\x02\x02\x02\x02l\x03\x02\x02" +
		"\x02\x02n\x03\x02\x02\x02\x02p\x03\x02\x02\x02\x02r\x03\x02\x02\x02\x02" +
		"t\x03\x02\x02\x02\x02v\x03\x02\x02\x02\x02x\x03\x02\x02\x02\x02z\x03\x02" +
		"\x02\x02\x02|\x03\x02\x02\x02\x02~\x03\x02\x02\x02\x02\x80\x03\x02\x02" +
		"\x02\x02\x82\x03\x02\x02\x02\x02\x84\x03\x02\x02\x02\x02\x86\x03\x02\x02" +
		"\x02\x02\x88\x03\x02\x02\x02\x02\x8A\x03\x02\x02\x02\x02\x8C\x03\x02\x02" +
		"\x02\x02\x8E\x03\x02\x02\x02\x02\x90\x03\x02\x02\x02\x02\x92\x03\x02\x02" +
		"\x02\x02\x94\x03\x02\x02\x02\x02\x96\x03\x02\x02\x02\x02\x98\x03\x02\x02" +
		"\x02\x02\x9A\x03\x02\x02\x02\x02\x9C\x03\x02\x02\x02\x02\x9E\x03\x02\x02" +
		"\x02\x02\xA0\x03\x02\x02\x02\x02\xA2\x03\x02\x02\x02\x02\xA4\x03\x02\x02" +
		"\x02\x02\xA6\x03\x02\x02\x02\x02\xA8\x03\x02\x02\x02\x03\xAA\x03\x02\x02" +
		"\x02\x03\xAC\x03\x02\x02\x02\x04\xAF\x03\x02\x02\x02\x06\xCA\x03\x02\x02" +
		"\x02\b\xCE\x03\x02\x02\x02\n\xD0\x03\x02\x02\x02\f\xD2\x03\x02\x02\x02" +
		"\x0E\xD4\x03\x02\x02\x02\x10\xD6\x03\x02\x02\x02\x12\xD8\x03\x02\x02\x02" +
		"\x14\xDA\x03\x02\x02\x02\x16\xDE\x03\x02\x02\x02\x18\xE3\x03\x02\x02\x02" +
		"\x1A\xE5\x03\x02\x02\x02\x1C\xE7\x03\x02\x02\x02\x1E\xEA\x03\x02\x02\x02" +
		" \xED\x03\x02\x02\x02\"\xF2\x03\x02\x02\x02$\xF8\x03\x02\x02\x02&\xFB" +
		"\x03\x02\x02\x02(\xFF\x03\x02\x02\x02*\u0108\x03\x02\x02\x02,\u010E\x03" +
		"\x02\x02\x02.\u0115\x03\x02\x02\x020\u0119\x03\x02\x02\x022\u011D\x03" +
		"\x02\x02\x024\u0123\x03\x02\x02\x026\u0129\x03\x02\x02\x028\u012E\x03" +
		"\x02\x02\x02:\u0139\x03\x02\x02\x02<\u013B\x03\x02\x02\x02>\u013D\x03" +
		"\x02\x02\x02@\u013F\x03\x02\x02\x02B\u0142\x03\x02\x02\x02D\u0144\x03" +
		"\x02\x02\x02F\u0146\x03\x02\x02\x02H\u0148\x03\x02\x02\x02J\u014B\x03" +
		"\x02\x02\x02L\u014E\x03\x02\x02\x02N\u0152\x03\x02\x02\x02P\u0154\x03" +
		"\x02\x02\x02R\u0157\x03\x02\x02\x02T\u0159\x03\x02\x02\x02V\u015C\x03" +
		"\x02\x02\x02X\u015F\x03\x02\x02\x02Z\u0163\x03\x02\x02\x02\\\u0166\x03" +
		"\x02\x02\x02^\u016A\x03\x02\x02\x02`\u016C\x03\x02\x02\x02b\u016E\x03" +
		"\x02\x02\x02d\u0170\x03\x02\x02\x02f\u0173\x03\x02\x02\x02h\u0176\x03" +
		"\x02\x02\x02j\u0178\x03\x02\x02\x02l\u017A\x03\x02\x02\x02n\u017D\x03" +
		"\x02\x02\x02p\u0180\x03\x02\x02\x02r\u0183\x03\x02\x02\x02t\u0186\x03" +
		"\x02\x02\x02v\u018A\x03\x02\x02\x02x\u018D\x03\x02\x02\x02z\u0190\x03" +
		"\x02\x02\x02|\u0192\x03\x02\x02\x02~\u0195\x03\x02\x02\x02\x80\u0198\x03" +
		"\x02\x02\x02\x82\u019B\x03\x02\x02\x02\x84\u019E\x03\x02\x02\x02\x86\u01A1" +
		"\x03\x02\x02\x02\x88\u01A4\x03\x02\x02\x02\x8A\u01A7\x03\x02\x02\x02\x8C" +
		"\u01AA\x03\x02\x02\x02\x8E\u01AE\x03\x02\x02\x02\x90\u01B2\x03\x02\x02" +
		"\x02\x92\u01B7\x03\x02\x02\x02\x94\u01C0\x03\x02\x02\x02\x96\u01D2\x03" +
		"\x02\x02\x02\x98\u01DF\x03\x02\x02\x02\x9A\u020F\x03\x02\x02\x02\x9C\u0211" +
		"\x03\x02\x02\x02\x9E\u0222\x03\x02\x02\x02\xA0\u0227\x03\x02\x02\x02\xA2" +
		"\u022D\x03\x02\x02\x02\xA4\u0258\x03\x02\x02\x02\xA6\u025A\x03\x02\x02" +
		"\x02\xA8\u025E\x03\x02\x02\x02\xAA\u026D\x03\x02\x02\x02\xAC\u0271\x03" +
		"\x02\x02\x02\xAE\xB0\t\x02\x02\x02\xAF\xAE\x03\x02\x02\x02\xB0\xB1\x03" +
		"\x02\x02\x02\xB1\xAF\x03\x02\x02\x02\xB1\xB2\x03\x02\x02\x02\xB2\xB3\x03" +
		"\x02\x02\x02\xB3\xB4\b\x02\x02\x02\xB4\x05\x03\x02\x02\x02\xB5\xB6\x07" +
		"1\x02\x02\xB6\xB7\x071\x02\x02\xB7\xBB\x03\x02\x02\x02\xB8\xBA\v\x02\x02" +
		"\x02\xB9\xB8\x03\x02\x02\x02\xBA\xBD\x03\x02\x02\x02\xBB\xBC\x03\x02\x02" +
		"\x02\xBB\xB9\x03\x02\x02\x02\xBC\xBE\x03\x02\x02\x02\xBD\xBB\x03\x02\x02" +
		"\x02\xBE\xCB\t\x03\x02\x02\xBF\xC0\x071\x02\x02\xC0\xC1\x07,\x02\x02\xC1" +
		"\xC5\x03\x02\x02\x02\xC2\xC4\v\x02\x02\x02\xC3\xC2\x03\x02\x02\x02\xC4" +
		"\xC7\x03\x02\x02\x02\xC5\xC6\x03\x02\x02\x02\xC5\xC3\x03\x02\x02\x02\xC6" +
		"\xC8\x03\x02\x02\x02\xC7\xC5\x03\x02\x02\x02\xC8\xC9\x07,\x02\x02\xC9" +
		"\xCB\x071\x02\x02\xCA\xB5\x03\x02\x02\x02\xCA\xBF\x03\x02\x02\x02\xCB" +
		"\xCC\x03\x02\x02\x02\xCC\xCD\b\x03\x02\x02\xCD\x07\x03\x02\x02\x02\xCE" +
		"\xCF\x07}\x02\x02\xCF\t\x03\x02\x02\x02\xD0\xD1\x07\x7F\x02\x02\xD1\v" +
		"\x03\x02\x02\x02\xD2\xD3\x07]\x02\x02\xD3\r\x03\x02\x02\x02\xD4\xD5\x07" +
		"_\x02\x02\xD5\x0F\x03\x02\x02\x02\xD6\xD7\x07*\x02\x02\xD7\x11\x03\x02" +
		"\x02\x02\xD8\xD9\x07+\x02\x02\xD9\x13\x03\x02\x02\x02\xDA\xDB\x070\x02" +
		"\x02\xDB\xDC\x03\x02\x02\x02\xDC\xDD\b\n\x03\x02\xDD\x15\x03\x02\x02\x02" +
		"\xDE\xDF\x07A\x02\x02\xDF\xE0\x070\x02\x02\xE0\xE1\x03\x02\x02\x02\xE1" +
		"\xE2\b\v\x03\x02\xE2\x17\x03\x02\x02\x02\xE3\xE4\x07.\x02\x02\xE4\x19" +
		"\x03\x02\x02\x02\xE5\xE6\x07=\x02\x02\xE6\x1B\x03\x02\x02\x02\xE7\xE8" +
		"\x07k\x02\x02\xE8\xE9\x07h\x02\x02\xE9\x1D\x03\x02\x02\x02\xEA\xEB\x07" +
		"k\x02\x02\xEB\xEC\x07p\x02\x02\xEC\x1F\x03\x02\x02\x02\xED\xEE\x07g\x02" +
		"\x02\xEE\xEF\x07n\x02\x02\xEF\xF0\x07u\x02\x02\xF0\xF1\x07g\x02\x02\xF1" +
		"!\x03\x02\x02\x02\xF2\xF3\x07y\x02\x02\xF3\xF4\x07j\x02\x02\xF4\xF5\x07" +
		"k\x02\x02\xF5\xF6\x07n\x02\x02\xF6\xF7\x07g\x02\x02\xF7#\x03\x02\x02\x02" +
		"\xF8\xF9\x07f\x02\x02\xF9\xFA\x07q\x02\x02\xFA%\x03\x02\x02\x02\xFB\xFC" +
		"\x07h\x02\x02\xFC\xFD\x07q\x02\x02\xFD\xFE\x07t\x02\x02\xFE\'\x03\x02" +
		"\x02\x02\xFF\u0100\x07e\x02\x02\u0100\u0101\x07q\x02\x02\u0101\u0102\x07" +
		"p\x02\x02\u0102\u0103\x07v\x02\x02\u0103\u0104\x07k\x02\x02\u0104\u0105" +
		"\x07p\x02\x02\u0105\u0106\x07w\x02\x02\u0106\u0107\x07g\x02\x02\u0107" +
		")\x03\x02\x02\x02\u0108\u0109\x07d\x02\x02\u0109\u010A\x07t\x02\x02\u010A" +
		"\u010B\x07g\x02\x02\u010B\u010C\x07c\x02\x02\u010C\u010D\x07m\x02\x02" +
		"\u010D+\x03\x02\x02\x02\u010E\u010F\x07t\x02\x02\u010F\u0110\x07g\x02" +
		"\x02\u0110\u0111\x07v\x02\x02\u0111\u0112\x07w\x02\x02\u0112\u0113\x07" +
		"t\x02\x02\u0113\u0114\x07p\x02\x02\u0114-\x03\x02\x02\x02\u0115\u0116" +
		"\x07p\x02\x02\u0116\u0117\x07g\x02\x02\u0117\u0118\x07y\x02\x02\u0118" +
		"/\x03\x02\x02\x02\u0119\u011A\x07v\x02\x02\u011A\u011B\x07t\x02\x02\u011B" +
		"\u011C\x07{\x02\x02\u011C1\x03\x02\x02\x02\u011D\u011E\x07e\x02\x02\u011E" +
		"\u011F\x07c\x02\x02\u011F\u0120\x07v\x02\x02\u0120\u0121\x07e\x02\x02" +
		"\u0121\u0122\x07j\x02\x02\u01223\x03\x02\x02\x02\u0123\u0124\x07v\x02" +
		"\x02\u0124\u0125\x07j\x02\x02\u0125\u0126\x07t\x02\x02\u0126\u0127\x07" +
		"q\x02\x02\u0127\u0128\x07y\x02\x02\u01285\x03\x02\x02\x02\u0129\u012A" +
		"\x07v\x02\x02\u012A\u012B\x07j\x02\x02\u012B\u012C\x07k\x02\x02\u012C" +
		"\u012D\x07u\x02\x02\u012D7\x03\x02\x02\x02\u012E\u012F\x07k\x02\x02\u012F" +
		"\u0130\x07p\x02\x02\u0130\u0131\x07u\x02\x02\u0131\u0132\x07v\x02\x02" +
		"\u0132\u0133\x07c\x02\x02\u0133\u0134\x07p\x02\x02\u0134\u0135\x07e\x02" +
		"\x02\u0135\u0136\x07g\x02\x02\u0136\u0137\x07q\x02\x02\u0137\u0138\x07" +
		"h\x02\x02\u01389\x03\x02\x02\x02\u0139\u013A\x07#\x02\x02\u013A;\x03\x02" +
		"\x02\x02\u013B\u013C\x07\x80\x02\x02\u013C=\x03\x02\x02\x02\u013D\u013E" +
		"\x07,\x02\x02\u013E?\x03\x02\x02\x02\u013F\u0140\x071\x02\x02\u0140\u0141" +
		"\x06 \x02\x02\u0141A\x03\x02\x02\x02\u0142\u0143\x07\'\x02\x02\u0143C" +
		"\x03\x02\x02\x02\u0144\u0145\x07-\x02\x02\u0145E\x03\x02\x02\x02\u0146" +
		"\u0147\x07/\x02\x02\u0147G\x03\x02\x02\x02\u0148\u0149\x07>\x02\x02\u0149" +
		"\u014A\x07>\x02\x02\u014AI\x03\x02\x02\x02\u014B\u014C\x07@\x02\x02\u014C" +
		"\u014D\x07@\x02\x02\u014DK\x03\x02\x02\x02\u014E\u014F\x07@\x02\x02\u014F" +
		"\u0150\x07@\x02\x02\u0150\u0151\x07@\x02\x02\u0151M\x03\x02\x02\x02\u0152" +
		"\u0153\x07>\x02\x02\u0153O\x03\x02\x02\x02\u0154\u0155\x07>\x02\x02\u0155" +
		"\u0156\x07?\x02\x02\u0156Q\x03\x02\x02\x02\u0157\u0158\x07@\x02\x02\u0158" +
		"S\x03\x02\x02\x02\u0159\u015A\x07@\x02\x02\u015A\u015B\x07?\x02\x02\u015B" +
		"U\x03\x02\x02\x02\u015C\u015D\x07?\x02\x02\u015D\u015E\x07?\x02\x02\u015E" +
		"W\x03\x02\x02\x02\u015F\u0160\x07?\x02\x02\u0160\u0161\x07?\x02\x02\u0161" +
		"\u0162\x07?\x02\x02\u0162Y\x03\x02\x02\x02\u0163\u0164\x07#\x02\x02\u0164" +
		"\u0165\x07?\x02\x02\u0165[\x03\x02\x02\x02\u0166\u0167\x07#\x02\x02\u0167" +
		"\u0168\x07?\x02\x02\u0168\u0169\x07?\x02\x02\u0169]\x03\x02\x02\x02\u016A" +
		"\u016B\x07(\x02\x02\u016B_\x03\x02\x02\x02\u016C\u016D\x07`\x02\x02\u016D" +
		"a\x03\x02\x02\x02\u016E\u016F\x07~\x02\x02\u016Fc\x03\x02\x02\x02\u0170" +
		"\u0171\x07(\x02\x02\u0171\u0172\x07(\x02\x02\u0172e\x03\x02\x02\x02\u0173" +
		"\u0174\x07~\x02\x02\u0174\u0175\x07~\x02\x02\u0175g\x03\x02\x02\x02\u0176" +
		"\u0177\x07A\x02\x02\u0177i\x03\x02\x02\x02\u0178\u0179\x07<\x02\x02\u0179" +
		"k\x03\x02\x02\x02\u017A\u017B\x07A\x02\x02\u017B\u017C\x07<\x02\x02\u017C" +
		"m\x03\x02\x02\x02\u017D\u017E\x07<\x02\x02\u017E\u017F\x07<\x02\x02\u017F" +
		"o\x03\x02\x02\x02\u0180\u0181\x07/\x02\x02\u0181\u0182\x07@\x02\x02\u0182" +
		"q\x03\x02\x02\x02\u0183\u0184\x07?\x02\x02\u0184\u0185\x07\x80\x02\x02" +
		"\u0185s\x03\x02\x02\x02\u0186\u0187\x07?\x02\x02\u0187\u0188\x07?\x02" +
		"\x02\u0188\u0189\x07\x80\x02\x02\u0189u\x03\x02\x02\x02\u018A\u018B\x07" +
		"-\x02\x02\u018B\u018C\x07-\x02\x02\u018Cw\x03\x02\x02\x02\u018D\u018E" +
		"\x07/\x02\x02\u018E\u018F\x07/\x02\x02\u018Fy\x03\x02\x02\x02\u0190\u0191" +
		"\x07?\x02\x02\u0191{\x03\x02\x02\x02\u0192\u0193\x07-\x02\x02\u0193\u0194" +
		"\x07?\x02\x02\u0194}\x03\x02\x02\x02\u0195\u0196\x07/\x02\x02\u0196\u0197" +
		"\x07?\x02\x02\u0197\x7F\x03\x02\x02\x02\u0198\u0199\x07,\x02\x02\u0199" +
		"\u019A\x07?\x02\x02\u019A\x81\x03\x02\x02\x02\u019B\u019C\x071\x02\x02" +
		"\u019C\u019D\x07?\x02\x02\u019D\x83\x03\x02\x02\x02\u019E\u019F\x07\'" +
		"\x02\x02\u019F\u01A0\x07?\x02\x02\u01A0\x85\x03\x02\x02\x02\u01A1\u01A2" +
		"\x07(\x02\x02\u01A2\u01A3\x07?\x02\x02\u01A3\x87\x03\x02\x02\x02\u01A4" +
		"\u01A5\x07`\x02\x02\u01A5\u01A6\x07?\x02\x02\u01A6\x89\x03\x02\x02\x02" +
		"\u01A7\u01A8\x07~\x02\x02\u01A8\u01A9\x07?\x02\x02\u01A9\x8B\x03\x02\x02" +
		"\x02\u01AA\u01AB\x07>\x02\x02\u01AB\u01AC\x07>\x02\x02\u01AC\u01AD\x07" +
		"?\x02\x02\u01AD\x8D\x03\x02\x02\x02\u01AE\u01AF\x07@\x02\x02\u01AF\u01B0" +
		"\x07@\x02\x02\u01B0\u01B1\x07?\x02\x02\u01B1\x8F\x03\x02\x02\x02\u01B2" +
		"\u01B3\x07@\x02\x02\u01B3\u01B4\x07@\x02\x02\u01B4\u01B5\x07@\x02\x02" +
		"\u01B5\u01B6\x07?\x02\x02\u01B6\x91\x03\x02\x02\x02\u01B7\u01B9\x072\x02" +
		"\x02\u01B8\u01BA\t\x04\x02\x02\u01B9\u01B8\x03\x02\x02\x02\u01BA\u01BB" +
		"\x03\x02\x02\x02\u01BB\u01B9\x03\x02\x02\x02\u01BB\u01BC\x03\x02\x02\x02" +
		"\u01BC\u01BE\x03\x02\x02\x02\u01BD\u01BF\t\x05\x02\x02\u01BE\u01BD\x03" +
		"\x02\x02\x02\u01BE\u01BF\x03\x02\x02\x02\u01BF\x93\x03\x02\x02\x02\u01C0" +
		"\u01C1\x072\x02\x02\u01C1\u01C3\t\x06\x02\x02\u01C2\u01C4\t\x07\x02\x02" +
		"\u01C3\u01C2\x03\x02\x02\x02\u01C4\u01C5\x03\x02\x02\x02\u01C5\u01C3\x03" +
		"\x02\x02\x02\u01C5\u01C6\x03\x02\x02\x02\u01C6\u01C8\x03\x02\x02\x02\u01C7" +
		"\u01C9\t\x05\x02\x02\u01C8\u01C7\x03\x02\x02\x02\u01C8\u01C9\x03\x02\x02" +
		"\x02\u01C9\x95\x03\x02\x02\x02\u01CA\u01D3\x072\x02\x02\u01CB\u01CF\t" +
		"\b\x02\x02\u01CC\u01CE\t\t\x02\x02\u01CD\u01CC\x03\x02\x02\x02\u01CE\u01D1" +
		"\x03\x02\x02\x02\u01CF\u01CD\x03\x02\x02\x02\u01CF\u01D0\x03\x02\x02\x02" +
		"\u01D0\u01D3\x03\x02\x02\x02\u01D1\u01CF\x03\x02\x02\x02\u01D2\u01CA\x03" +
		"\x02\x02\x02\u01D2\u01CB\x03\x02\x02\x02\u01D3\u01D5\x03\x02\x02\x02\u01D4" +
		"\u01D6\t\n\x02\x02\u01D5\u01D4\x03\x02\x02\x02\u01D5\u01D6\x03\x02\x02" +
		"\x02\u01D6\x97\x03\x02\x02\x02\u01D7\u01E0\x072\x02\x02\u01D8\u01DC\t" +
		"\b\x02\x02\u01D9\u01DB\t\t\x02\x02\u01DA\u01D9\x03\x02\x02\x02\u01DB\u01DE" +
		"\x03\x02\x02\x02\u01DC\u01DA\x03\x02\x02\x02\u01DC\u01DD\x03\x02\x02\x02" +
		"\u01DD\u01E0\x03\x02\x02\x02\u01DE\u01DC\x03\x02\x02\x02\u01DF\u01D7\x03" +
		"\x02\x02\x02\u01DF\u01D8\x03\x02\x02\x02\u01E0\u01E7\x03\x02\x02\x02\u01E1" +
		"\u01E3\x05\x14\n\x02\u01E2\u01E4\t\t\x02\x02\u01E3\u01E2\x03\x02\x02\x02" +
		"\u01E4\u01E5\x03\x02\x02\x02\u01E5\u01E3\x03\x02\x02\x02\u01E5\u01E6\x03" +
		"\x02\x02\x02\u01E6\u01E8\x03\x02\x02\x02\u01E7\u01E1\x03\x02\x02\x02\u01E7" +
		"\u01E8\x03\x02\x02\x02\u01E8\u01F2\x03\x02\x02\x02\u01E9\u01EB\t\v\x02" +
		"\x02\u01EA\u01EC\t\f\x02\x02\u01EB\u01EA\x03\x02\x02\x02\u01EB\u01EC\x03" +
		"\x02\x02\x02\u01EC\u01EE\x03\x02\x02\x02\u01ED\u01EF\t\t\x02\x02\u01EE" +
		"\u01ED\x03\x02\x02\x02\u01EF\u01F0\x03\x02\x02\x02\u01F0\u01EE\x03\x02" +
		"\x02\x02\u01F0\u01F1\x03\x02\x02\x02\u01F1\u01F3\x03\x02\x02\x02\u01F2" +
		"\u01E9\x03\x02\x02\x02\u01F2\u01F3\x03\x02\x02\x02\u01F3\u01F5\x03\x02" +
		"\x02\x02\u01F4\u01F6\t\r\x02\x02\u01F5\u01F4\x03\x02\x02\x02\u01F5\u01F6" +
		"\x03\x02\x02\x02\u01F6\x99\x03\x02\x02\x02\u01F7\u01FF\x07$\x02\x02\u01F8" +
		"\u01F9\x07^\x02\x02\u01F9\u01FE\x07$\x02\x02\u01FA\u01FB\x07^\x02\x02" +
		"\u01FB\u01FE\x07^\x02\x02\u01FC\u01FE\n\x0E\x02\x02\u01FD\u01F8\x03\x02" +
		"\x02\x02\u01FD\u01FA\x03\x02\x02\x02\u01FD\u01FC\x03\x02\x02\x02\u01FE" +
		"\u0201\x03\x02\x02\x02\u01FF\u0200\x03\x02\x02\x02\u01FF\u01FD\x03\x02" +
		"\x02\x02\u0200\u0202\x03\x02\x02\x02\u0201\u01FF\x03\x02\x02\x02\u0202" +
		"\u0210\x07$\x02\x02\u0203\u020B\x07)\x02\x02\u0204\u0205\x07^\x02\x02" +
		"\u0205\u020A\x07)\x02\x02\u0206\u0207\x07^\x02\x02\u0207\u020A\x07^\x02" +
		"\x02\u0208\u020A\n\x0F\x02\x02\u0209\u0204\x03\x02\x02\x02\u0209\u0206" +
		"\x03\x02\x02\x02\u0209\u0208\x03\x02\x02\x02\u020A\u020D\x03\x02\x02\x02" +
		"\u020B\u020C\x03\x02\x02\x02\u020B\u0209\x03\x02\x02\x02\u020C";
	private static readonly _serializedATNSegment1: string =
		"\u020E\x03\x02\x02\x02\u020D\u020B\x03\x02\x02\x02\u020E\u0210\x07)\x02" +
		"\x02\u020F\u01F7\x03\x02\x02\x02\u020F\u0203\x03\x02\x02\x02\u0210\x9B" +
		"\x03\x02\x02\x02\u0211\u0215\x071\x02\x02\u0212\u0213\x07^\x02\x02\u0213" +
		"\u0216\n\x10\x02\x02\u0214\u0216\n\x11\x02\x02\u0215\u0212\x03\x02\x02" +
		"\x02\u0215\u0214\x03\x02\x02\x02\u0216\u0217\x03\x02\x02\x02\u0217\u0218" +
		"\x03\x02\x02\x02\u0217\u0215\x03\x02\x02\x02\u0218\u0219\x03\x02\x02\x02" +
		"\u0219\u021D\x071\x02\x02\u021A\u021C\t\x12\x02\x02\u021B\u021A\x03\x02" +
		"\x02\x02\u021C\u021F\x03\x02\x02\x02\u021D\u021B\x03\x02\x02\x02\u021D" +
		"\u021E\x03\x02\x02\x02\u021E\u0220\x03\x02\x02\x02\u021F\u021D\x03\x02" +
		"\x02\x02\u0220\u0221\x06N\x03\x02\u0221\x9D\x03\x02\x02\x02\u0222\u0223" +
		"\x07v\x02\x02\u0223\u0224\x07t\x02\x02\u0224\u0225\x07w\x02\x02\u0225" +
		"\u0226\x07g\x02\x02\u0226\x9F\x03\x02\x02\x02\u0227\u0228\x07h\x02\x02" +
		"\u0228\u0229\x07c\x02\x02\u0229\u022A\x07n\x02\x02\u022A\u022B\x07u\x02" +
		"\x02\u022B\u022C\x07g\x02\x02\u022C\xA1\x03\x02\x02\x02\u022D\u022E\x07" +
		"p\x02\x02\u022E\u022F\x07w\x02\x02\u022F\u0230\x07n\x02\x02\u0230\u0231" +
		"\x07n\x02\x02\u0231\xA3\x03\x02\x02\x02\u0232\u0233\x07d\x02\x02\u0233" +
		"\u0234\x07q\x02\x02\u0234\u0235\x07q\x02\x02\u0235\u0236\x07n\x02\x02" +
		"\u0236\u0237\x07g\x02\x02\u0237\u0238\x07c\x02\x02\u0238\u0259\x07p\x02" +
		"\x02\u0239\u023A\x07d\x02\x02\u023A\u023B\x07{\x02\x02\u023B\u023C\x07" +
		"v\x02\x02\u023C\u0259\x07g\x02\x02\u023D\u023E\x07u\x02\x02\u023E\u023F" +
		"\x07j\x02\x02\u023F\u0240\x07q\x02\x02\u0240\u0241\x07t\x02\x02\u0241" +
		"\u0259\x07v\x02\x02\u0242\u0243\x07e\x02\x02\u0243\u0244\x07j\x02\x02" +
		"\u0244\u0245\x07c\x02\x02\u0245\u0259\x07t\x02\x02\u0246\u0247\x07k\x02" +
		"\x02\u0247\u0248\x07p\x02\x02\u0248\u0259\x07v\x02\x02\u0249\u024A\x07" +
		"n\x02\x02\u024A\u024B\x07q\x02\x02\u024B\u024C\x07p\x02\x02\u024C\u0259" +
		"\x07i\x02\x02\u024D\u024E\x07h\x02\x02\u024E\u024F\x07n\x02\x02\u024F" +
		"\u0250\x07q\x02\x02\u0250\u0251\x07c\x02\x02\u0251\u0259\x07v\x02\x02" +
		"\u0252\u0253\x07f\x02\x02\u0253\u0254\x07q\x02\x02\u0254\u0255\x07w\x02" +
		"\x02\u0255\u0256\x07d\x02\x02\u0256\u0257\x07n\x02\x02\u0257\u0259\x07" +
		"g\x02\x02\u0258\u0232\x03\x02\x02\x02\u0258\u0239\x03\x02\x02\x02\u0258" +
		"\u023D\x03\x02\x02\x02\u0258\u0242\x03\x02\x02\x02\u0258\u0246\x03\x02" +
		"\x02\x02\u0258\u0249\x03\x02\x02\x02\u0258\u024D\x03\x02\x02\x02\u0258" +
		"\u0252\x03\x02\x02\x02\u0259\xA5\x03\x02\x02\x02\u025A\u025B\x07f\x02" +
		"\x02\u025B\u025C\x07g\x02\x02\u025C\u025D\x07h\x02\x02\u025D\xA7\x03\x02" +
		"\x02\x02\u025E\u0262\t\x13\x02\x02\u025F\u0261\t\x14\x02\x02\u0260\u025F" +
		"\x03\x02\x02\x02\u0261\u0264\x03\x02\x02\x02\u0262\u0260\x03\x02\x02\x02" +
		"\u0262\u0263\x03\x02\x02\x02\u0263\xA9\x03\x02\x02\x02\u0264\u0262\x03" +
		"\x02\x02\x02\u0265\u026E\x072\x02\x02\u0266\u026A\t\b\x02\x02\u0267\u0269" +
		"\t\t\x02\x02\u0268\u0267\x03\x02\x02\x02\u0269\u026C\x03\x02\x02\x02\u026A" +
		"\u0268\x03\x02\x02\x02\u026A\u026B\x03\x02\x02\x02\u026B\u026E\x03\x02" +
		"\x02\x02\u026C\u026A\x03\x02\x02\x02\u026D\u0265\x03\x02\x02\x02\u026D" +
		"\u0266\x03\x02\x02\x02\u026E\u026F\x03\x02\x02\x02\u026F\u0270\bU\x04" +
		"\x02\u0270\xAB\x03\x02\x02\x02\u0271\u0275\t\x13\x02\x02\u0272\u0274\t" +
		"\x14\x02\x02\u0273\u0272\x03\x02\x02\x02\u0274\u0277\x03\x02\x02\x02\u0275" +
		"\u0273\x03\x02\x02\x02\u0275\u0276\x03\x02\x02\x02\u0276\u0278\x03\x02" +
		"\x02\x02\u0277\u0275\x03\x02\x02\x02\u0278\u0279\bV\x04\x02\u0279\xAD" +
		"\x03\x02\x02\x02$\x02\x03\xB1\xBB\xC5\xCA\u01BB\u01BE\u01C5\u01C8\u01CF" +
		"\u01D2\u01D5\u01DC\u01DF\u01E5\u01E7\u01EB\u01F0\u01F2\u01F5\u01FD\u01FF" +
		"\u0209\u020B\u020F\u0215\u0217\u021D\u0258\u0262\u026A\u026D\u0275\x05" +
		"\b\x02\x02\x04\x03\x02\x04\x02\x02";
	public static readonly _serializedATN: string = Utils.join(
		[
			PainlessLexer._serializedATNSegment0,
			PainlessLexer._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PainlessLexer.__ATN) {
			PainlessLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(PainlessLexer._serializedATN));
		}

		return PainlessLexer.__ATN;
	}

}

