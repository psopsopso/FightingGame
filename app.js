const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            playerPower: 20,
            playerHealingPower: 10,
            monsterHealth: 100,
            monsterPower: 25,
            monsterHealingPower: 5,
            currentRound: 0,
            isGameOver: false,
            isPlayerWinner: null,
            logMessages: [],
        };
    },
    methods: {
        attackMonster() {
            this.currentRound += 1;
            const damageDealt = this.strikeCalc(this.playerPower);
            this.monsterHealth = Math.max(this.monsterHealth - damageDealt, 0);
            const monsterImage = document.querySelector(".monster-img");
            monsterImage.classList.add("monster-hit");
            setTimeout(() => {
                monsterImage.classList.remove("monster-hit");
            }, 500);
            this.attackPlayer();
        },
        specialAttack() {
            this.currentRound += 1;
            const damageDealt = this.strikeCalc(this.playerPower) * 2;

            this.monsterHealth = Math.max(this.monsterHealth - damageDealt, 0);
            this.attackPlayer();
        },
        playerHeal() {
            this.currentRound += 1;
            this.playerHealth = Math.min(
                this.playerHealth + this.playerHealingPower,
                100
            );
            this.monsterHealth = Math.min(
                this.monsterHealth + this.monsterHealingPower,
                100
            );
            this.attackPlayer(0.3);
        },
        attackPlayer(multiplier = 1) {
            const damageDealt = this.strikeCalc(this.monsterPower) * multiplier;
            this.playerHealth = Math.max(this.playerHealth - damageDealt, 0);
        },
        strikeCalc(power) {
            return Math.floor(Math.random() * power);
        },
        startNewGame() {
            this.isGameOver = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.logMessages = [];
            const monsterImage = document.querySelector("img");
            monsterImage.style.opacity = 1;
        },

        animateMonsterDeath() {
            const monsterImage = document.querySelector("img");
            monsterImage.style.transition = "opacity 1s ease-in-out";
            monsterImage.style.opacity = 0;
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
                    this.isMonsterAlive = false;
                    this.animateMonsterDeath();
                }, 10);
            }
        },
    },
});
app.mount("#game");
