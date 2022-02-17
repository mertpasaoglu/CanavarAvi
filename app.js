new Vue ({
    el : "#app",
    data : {
        player_heal : 100,
        monster_heal : 100,
        logs : [],
        game_is_on : false,
        attack_multiple : 10,
        special_attack_multiple : 25,
        heal_up_multiple : 20,
        monster_attack_multiple : 15,
        log_text : {
            attack : "Oyuncu Atağı : ",
            special_attack : "Özel Oyuncu Atağı : ",
            monster_attack : "Canavar Atağı : ",
            heal_up : "İlk Yardım : ",
            give_up : "Oyuncu Pes Etti : "
        }, 
    },
    methods : {
        start_game : function(){
            this.game_is_on=true
        },
        attack : function(){
            var point = Math.ceil(Math.random() * this.attack_multiple);
            //this.monster_heal = this.monster_heal - point;
            this.monster_heal-=point;
            this.add_to_log({ turn : "p", text : this.log_text.attack + point })
            this.monster_attack();
            
        },
        special_attack : function(){
            var point = Math.ceil(Math.random() * this.special_attack_multiple);
            //this.monster_heal = this.monster_heal - point;
            this.add_to_log({ turn : "p", text : this.log_text.special_attack + point})
            this.monster_heal-=point;
            this.monster_attack();
            
        },
        heal_up : function(){
            var point = Math.ceil(Math.random() * this.heal_up_multiple);
            //this.monster_heal = this.monster_heal - point;
            this.add_to_log({ turn : "p", text : this.log_text.heal_up + point })
            this.player_heal+=point;
            this.monster_attack();
          
        },
        give_up : function(){
            this.add_to_log({ turn : "p", text : "Oyuncu Pes Etti!"})
            this.player_heal = 0;
            
          
        },
        monster_attack : function(){
            var point = Math.ceil(Math.random() * this.monster_attack_multiple);
            //this.monster_heal = this.monster_heal - point;
            this.add_to_log({ turn : "m", text : this.log_text.monster_attack + point })
            this.player_heal-=point;
        },
        add_to_log : function(log){
            this.logs.push(log);
        }
    },
    watch : {
        player_heal : function(value){
            if(value <= 0){
                this.player_heal = 0;
                if(confirm("Oyunu Kaybettin. Tekrar Denemek İster misin?")){
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = [];
                }
            } else if(value >= 100){
                this.player_heal = 100;
                this.logs = [];
            }
        },
        monster_heal : function(value){
            if(value <= 0){
                this.monster_heal = 0;
                if(confirm("Oyunu Kazandın. Tekrar Oynamak İster misin?")){
                    this.player_heal = 100;
                    this.monster_heal = 100;
                }
            }
        }

    },
    computed : {
        player_progress : function(){
            return {
                width : this.player_heal + "%"
            }
        },
        monster_progress : function(){
            return {
                width : this.monster_heal + "%"
            }
        }
    }
    

})