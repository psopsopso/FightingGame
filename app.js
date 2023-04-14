const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            playerPower: 15,
            healingPower: 15,
            monsterHealth: 100,
            monsterPower: 20,
            currentRound: 0,
            isGameOver: false,
        };
    },
    methods: {
        attackMonster() {
            this.currentRound += 1;
            const damageDealt = this.strikeCalc(this.playerPower);
            this.monsterHealth = Math.max(this.monsterHealth - damageDealt, 0);
            this.attackPlayer();
        },
        attackPlayer() {
            const damageDealt = this.strikeCalc(this.monsterPower);
            this.playerHealth = Math.max(this.playerHealth - damageDealt, 0);
        },
        strikeCalc(power) {
            return Math.floor(Math.random() * power);
        },
        heal() {
            this.currentRound += 1;
            this.playerHealth = Math.min(
                this.playerHealth + this.healingPower,
                100
            );
            this.attackPlayer();
        },
        specialAttack() {
            if (this.currentRound % 3 === 0) {
                this.currentRound += 1;
                const damageDealt = this.strikeCalc(this.playerPower * 2);
                this.monsterHealth = Math.max(
                    this.monsterHealth - damageDealt,
                    0
                );
                this.attackPlayer();
            }
        },
        surrender() {
            this.isGameOver = true;
        },
    },
    computed: {
        monsterBarStyle() {
            return { width: this.monsterHealth + "%" };
        },
        playerBarStyle() {
            return { width: this.playerHealth + "%" };
        },
    },
    watch: {
        playerHealth(newHealth) {
            if (newHealth <= 0) {
                window.alert("HAAAAA");
            }
        },
    },
});
app.mount("#game");
