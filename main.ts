import { TypeUtils } from './src/utils';
import { State } from './src/state';
import LogoConfiguration from './src/logo/logo-configuration';
import Logo from './src/logo/logo';
import MessageConfiguration from './src/message/message-configuration';
import Message from './src/message/message';
import ButtonConfiguration from './src/button/button-configuration';
import Button from './src/button/button';
import TableConfiguration from './src/table/table-configuration';
import Table from './src/table/table';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

(function(w, $) 
{
    //no jQuery around
    if (!$) return false;

    // estendo JQuery aggiungendo i plugin della UI Kit
    $.fn.extend({
        // Plugin definitions

        logo : function(opts : any) 
        {
            // configurazione 
            var opts = opts;
            if (opts == undefined) opts = {};

            // la lista dei metodi pubblici
            var methods : any = 
            {
                getDimension: function()
                {
                    // recupero l'instanza della classe Logo da 'data'
                    return $(this).data("logo").getDimension();
                }
            };

            // l'argomento opts può essere di due tipi: string oppure object
            if (TypeUtils.isObject(opts))
            {
                // se opts è di tipo object, vuol dire che dobbiamo instanziare il plugin
                var logoBuilder = function()
                {
                    var logoConfiguration = new LogoConfiguration(opts);
                    // assegnare l'instanza della classe Logo a 'data' ci servirà per la chiamata dei metodi (vedi methods.getDimension)
                    $(this).data("logo", new Logo($(this).get(0), logoConfiguration));
                }

                return this.each(logoBuilder);
            } 
            else
            {
                // se opts è di tipo string, vuol dire che dobbiamo chiamare un metodo pubblico
                return methods[opts].apply(this, Array.prototype.slice.call( arguments, 1 ));
            }
        },

        message : function(opts : MessageConfiguration)
        {
            var opts = opts;
            if (opts == undefined) return undefined;
            
            var messageBuilder = function()
            {
                $(this).data('message', new Message($(this).get(0), new MessageConfiguration(opts)));
            }

            return this.each(messageBuilder)
        },

        button : function(opts : any) 
        {
            var opts = opts;
            if (opts == undefined) opts = {};

            var methods : any = 
            {
                setState: function(state : State)
                {
                    $(this).data("button").setState(state);
                },

                getState: function()
                {
                    return $(this).data("button").getState();
                }
            };

            if (TypeUtils.isObject(opts))
            {
                var buttonBuilder = function()
                {
                    var buttonConfiguration = new ButtonConfiguration(opts);
                    $(this).data("button", new Button($(this).get(0), buttonConfiguration));
                }

                return this.each(buttonBuilder);
            } 
            else
                return methods[opts].apply(this, Array.prototype.slice.call( arguments, 1 ));
        },

        table : function(opts : TableConfiguration)
        {
            var opts = opts;
            if (opts == undefined) return undefined;
            
            var tableBuilder = function()
            {
                var tableConfiguration = new TableConfiguration(opts);
                $(this).data('table', new Table($(this).get(0), tableConfiguration));
            }
            
            return this.each(tableBuilder)
        }
    });
})(window, jQuery);