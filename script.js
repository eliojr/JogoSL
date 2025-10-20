        // --- 1. Configuração do Canvas ---
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Define o tamanho do canvas para preencher a tela
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // --- 2. Nosso Personagem (Player) ---
        const player = {
            x: canvas.width / 2,  // Posição inicial (centro X)
            y: canvas.height / 2, // Posição inicial (centro Y)
            width: 50,
            height: 50,
            color: 'blue',
            draw: function() {
                ctx.fillStyle = this.color;
                // Desenha o personagem centralizado na sua posição (x, y)
                ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            }
        };

        /**
         * ===================================================================
         * A FUNÇÃO PRINCIPAL PARA LER O TOUCH (O que você pediu)
         * Esta função configura os "ouvintes" (listeners) de eventos de toque.
         * ===================================================================
         */
        function setupTouchControls() {
            
            // Função auxiliar para atualizar a posição do jogador
            function updatePlayerPosition(event) {
                // Previne o comportamento padrão do navegador (como rolar a página ou dar zoom)
                event.preventDefault();

                // Pega as informações do toque. Usamos event.touches[0] para o primeiro dedo.
                if (event.touches.length > 0) {
                    const touch = event.touches[0];
                    
                    // Precisamos ajustar as coordenadas do toque para a posição relativa ao canvas
                    const rect = canvas.getBoundingClientRect();
                    const touchX = touch.clientX - rect.left;
                    const touchY = touch.clientY - rect.top;

                    // Atualiza a posição do jogador para onde o dedo está
                    player.x = touchX;
                    player.y = touchY;
                }
            }

            // Adiciona o "ouvinte" para quando o dedo TOCA a tela
            canvas.addEventListener('touchstart', updatePlayerPosition, { passive: false });

            // Adiciona o "ouvinte" para quando o dedo MOVE na tela
            canvas.addEventListener('touchmove', updatePlayerPosition, { passive: false });

            // NOTA: { passive: false } é importante.
            // Ele diz ao navegador que podemos chamar event.preventDefault()
            // para impedir que a página role enquanto o jogador arrasta o dedo.
        }

        // --- 4. O Game Loop (Loop de Animação) ---
        // Esta função roda continuamente para redesenhar a tela
        function gameLoop() {
            // 1. Limpa o canvas inteiro
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 2. Desenha o personagem na sua posição atual
            player.draw();

            // 3. Pede ao navegador para chamar gameLoop() novamente no próximo frame
            requestAnimationFrame(gameLoop);
        }

        // --- 5. Iniciar tudo ---
        
        // Configura os controles de toque que você pediu
        setupTouchControls();

        // Inicia o loop do jogo
        gameLoop();

        // Bônus: Se a tela for redimensionada (ex: girar o celular), ajusta o canvas
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Opcional: Centralizar o jogador se a tela mudar
            // player.x = canvas.width / 2;
            // player.y = canvas.height / 2;
        });
