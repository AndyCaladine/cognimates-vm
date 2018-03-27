const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const Clone = require('../../util/clone');
const Color = require('../../util/color');
const formatMessage = require('format-message');
const MathUtil = require('../../util/math-util');
const RenderedTarget = require('../../sprites/rendered-target');
const log = require('../../util/log');




// speech
const speech = require('speech-synth');
const voiceArray = {Albert: 'Albert',
    Agnes: 'Agnes',
    Veena: 'Veena',
    Alex: 'Alex',
    Alice: 'Alice',
    Alva: 'Alva',
    Amelie: 'Amelie',
    Anna: 'Anna',
    Banh: 'Bahh',
    Bells: 'Bells',
    Boing: 'Boing',
    Bruce: 'Bruce',
    Bubbles: 'Bubbles',
    Carmit: 'Carmit',
    Cellos: 'Cellos',
    Damayanti: 'Damayanti',
    Daniel: 'Daniel',
    Deranged: 'Deranged',
    Diego: 'Diego',
    Elle: 'Ellen',
    Fiona: 'Fiona',
    Fred: 'Fred',
    Hysterical: 'Hysterical',
    Ioana: 'Ioana',
    Joana: 'Joana'};
let voice = 'Ellen';

// let sentiment = require('sentiment');
// let localSentiment = 1;
// let isHappy = true;
// const ajax = require('es-ajax');
const iconURI = require('./assets/sentiment_icon');


class Scratch3SpeechBlocks {
    constructor (runtime) {
        this.runtime = runtime;
        this.SpeechRecognition = window.SpeechRecognition ||
                          window.webkitSpeechRecognition ||
                          window.mozSpeechRecognition ||
                          window.msSpeechRecognition ||
                          window.oSpeechRecognition;

    /**
     * A flag to indicate that speech recognition is paused during a speech synthesis utterance
     * to avoid feedback. This is used to avoid stopping and re-starting the speech recognition
     * engine.
     * @type {Boolean}
     */
    this.speechRecognitionPaused = false;

    /**
     * The most recent result from the speech recognizer, used for a reporter block.
     * @type {String}
     */
    this.latest_speech = '';

    /**
     * The name of the selected voice for speech synthesis.
     * @type {String}
     */
    this.current_voice_name = 'default';

    /**
     * The current speech synthesis utterance object.
     * Storing the utterance prevents a bug in which garbage collection causes the onend event to fail.
     * @type {String}
     */
    this.current_utterance = null;

    this.runtime.HACK_SpeechBlocks = this;
  
    }

    getInfo () {
        return {
            id: 'speech',
            name: 'Speech',
            blockIconURI: iconURI,
            blocks: [
                {
                    opcode: 'speak',
                    blockType: BlockType.COMMAND,
                    text: 'Say: [PHRASE]',
                    arguments: {
                        PHRASE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'hey'
                        }
                    }
                },
                {                
                    opcode: 'speechVoice',
                    blockType: BlockType.COMMAND,
                    text: 'set voice to [VOICE]',
                    arguments: {
                        VOICE: {
                            type: ArgumentType.STRING,
                            menu: 'voices',
                            defaultValue: 'Albert'
                        }
                    }
                }
                
            ],
            menus: {
                voices: ['Veena', 'Agnes', 'Albert', 'Alex', 'Alice', 'Alva', 'Amelie', 'Anna', 'Bahh', 'Bells', 'Boing', 'Bruce', 'Bubbles', 'Carmit', 'Cellos', 'Damayanti',
                'Daniel', 'Deranged', 'Diego', 'Ellen', 'Fiona', 'Fred', 'Hysterical', 'Ioana', 'Joana'],
            }
        };
    }

    speechVoice (args, util){
        const str = args.VOICE;
        voice = voiceArray[str];
    }
    speechSay (tts) {
        speech.say(tts, voice);
        return;
    }

    speak (args, util) {
    	this.speechSay(args.PHRASE);
    }
    
}


module.exports = Scratch3SpeechBlocks;