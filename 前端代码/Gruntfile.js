module.exports = function(grunt){

	require('time-grunt')(grunt);

	//配置任务
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {
				style: 'expanded'
			},
			login: {
				files: {
					'./css/login.css': './scss/login.scss'
				}
			},
			admin: {
				files: {
					'./css/admin.css': './scss/admin.scss'
				}
			},
			all: {
				files: [
					{src: ['./scss/index.scss'], dest: './css/index.css'},
					{src: ['./scss/login.scss'], dest: './css/login.css'},
					{src: ['./scss/admin.scss'], dest: './css/admin.css'}
				]
			}
		},
		uglify: {
			controllerjs: {
				files: {
					'./controllers/controllers.min.js': './controllers/controllers.js'
				}
			},
			servicesjs: {
				files: {
					'./services/services.min.js': './services/services.js'
				}
			},
			directivejs: {
				files: {
					'./directives/directives.min.js': './directives/directives.js'
				}
			}
		},
		concat: {
			css: {
				src: [
					'./css/index.css',
					'./css/login.css',
					'./css/admin.css'
				],
				dest: './css/app.css'
			},
			controllerjs: {
				options: {
					separator: ';'
				},
				files: [
					{
						src: [
							'./controllers/account/servicesController.js',
							'./controllers/account/registerController.js',
							'./controllers/account/loginController.js',
							'./controllers/home/cashierController.js',
							'./controllers/home/memberController.js',
							'./controllers/home/giftManageController.js',
							'./controllers/home/shopInfoController.js',
							'./controllers/home/vipController.js'
							],
						dest: './controllers/controllers.js'
					}
				]
			},
			servicejs: {
				options: {
					separator: ';'
				},
				files: [
					{
						src: [
							'./services/accountDom.js',
							'./services/registerFactory.js',
							'./services/registerInfo.js',
							'./services/accountDom.js',
							'./services/memberChartFactory.js',
							'./services/moneyChart.js',
							'./services/moneyOriginChart.js'
							],
						dest: './services/services.js'
					}
				]
			},
			directivejs: {
				options: {
					separator: ';'
				},
				files: [
					{
						src: [
							'./directives/components/account/accountTitleDirective.js',
							'./directives/components/account/loginAccountInput.js',
							'./directives/components/account/loginPassInput.js',
							'./directives/components/account/cardService.js',
							'./directives/components/home/homeTitleDirective.js',
							'./directives/components/home/sidebarDirective.js',
							'./directives/components/home/clipBoxDirective.js',
							'./directives/components/home/memberClassifyDirective.js',
							'./directives/components/home/memberChartDirective.js',
							'./directives/components/home/moneyChartDirective.js',
							'./directives/components/home/moneyOriginChartDirective.js',
							'./directives/decorations/account/formUploadDirective.js'
						],
						dest: './directives/directives.js'
					}
				]
			}
		},
		cssmin: {
			options: {
				keepSpecialComments: 0
			},
			css: {
				files: {
					'./css/app.min.css': './css/app.css'
				}
			}
		},
		watch: {
			concatControllerjs: {
				files: [
					'./controllers/account/loginController.js',
					'./controllers/account/registerController.js',
					'./controllers/account/servicesController.js',
					'./controllers/home/cashierController.js',
					'./controllers/home/memberController.js',
					'./controllers/home/giftManageController.js',
					'./controllers/home/shopInfoController.js',
					'./controllers/home/vipController.js'
					],
				tasks: ['concat:controllerjs']
			},
			concatServicejs: {
				files: [
					'./services/accountDom.js',
					'./services/registerFactory.js',
					'./services/registerInfo.js',
					'./services/accountDom.js',
					'./services/memberChartFactory.js',
					'./services/moneyChart.js',
					'./services/moneyOriginChart.js'
					],
				tasks: ['concat:servicejs']
			},
			concatDirectivejs: {
				files: [
					'./directives/components/account/accountTitleDirective.js',
					'./directives/components/account/loginAccountInput.js',
					'./directives/components/account/loginPassInput.js',
					'./directives/components/account/cardService.js',
					'./directives/components/home/homeTitleDirective.js',
					'./directives/components/home/sidebarDirective.js',
					'./directives/components/home/clipBoxDirective.js',
					'./directives/components/home/memberClassifyDirective.js',
					'./directives/components/home/memberChartDirective.js',
					'./directives/components/home/moneyChartDirective.js',
					'./directives/components/home/moneyOriginChartDirective.js',
					'./directives/decorations/account/formUploadDirective.js'
				],
				tasks: ['concat:directivejs']
			},
			sasslogin: {
				files: ['./scss/login.scss'],
				tasks: ['sass:login', 'concat:css']
			},
			sassadmin: {
				files: ['./scss/admin.scss'],
				tasks: ['sass:admin', 'concat:css']
			},
			html: {
				files: [
						'./index.html',
						'./controllers/account/login.html',
						'./controllers/account/register.html',
						'./controllers/account/services.html',
						'./controllers/home/admin.html',
						'./controllers/home/shopInfo.html',
						'./controllers/home/giftManage.html'
					]
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'./css/app.css',
						'./index.html',
						'./controllers/account/login.html',
						'./controllers/account/register.html',
						'./controllers/account/services.html',
						'./controllers/home/admin.html',
						'./controllers/home/giftManage.html',
						'./controllers/controllers.js',
						'./directives/directives.js',
						'./services/services.js'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: './'
					}				
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('css', ['sass:all', 'concat:css', 'cssmin:css']);
	grunt.registerTask('js', ['concat:controllerjs','concat:servicejs','concat:directivejs','uglify']);
	grunt.registerTask('run', ['browserSync','watch']);
	grunt.registerTask('default');
	
};