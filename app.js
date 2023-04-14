const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            playerPower: 15,
            healingPower: 12,
            monsterHealth: 100,
            monsterPower: 20,
            currentRound: 0,
            isGameOver: false,
            isPlayerWinner: null,
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
            this.currentRound += 1;
            const damageDealt = this.strikeCalc(this.playerPower * 2);
            this.monsterHealth = Math.max(this.monsterHealth - damageDealt, 0);
            this.attackPlayer();
        },
        surrender() {
            this.isGameOver = true;
        },
        startNewGame() {
            this.isGameOver = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
        },
    },
    computed: {
        monsterBarStyle() {
            return { width: this.monsterHealth + "%" };
        },
        playerBarStyle() {
            return { width: this.playerHealth + "%" };
        },
        isSpecialAttack() {
            return this.currentRound % 3 === 0;
        },
    },
    watch: {
        playerHealth(newHealth) {
            if (newHealth === 0) {
                setTimeout(() => {
                    this.isGameOver = true;
                    this.isPlayerWinner = false;
                }, 10);
            }
        },
        monsterHealth(newHealth) {
            if (newHealth === 0) {
                setTimeout(() => {
                    this.isGameOver = true;
                    this.isPlayerWinner = true;
                }, 10);
            }
        },
    },
});
app.mount("#game");
