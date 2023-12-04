import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as l,c as i,a as s,b as e,d as n,w as p,e as c}from"./app-fc608e80.js";const d={},u={href:"http://ttrss.henry.wang/zh/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/levito/tt-rss-feedly-theme",target:"_blank",rel:"noopener noreferrer"},m={href:"https://tt-rss.org/wiki/FAQ",target:"_blank",rel:"noopener noreferrer"},w=s("li",null,"定期备份：选择「偏好设置」>「订阅源」导出订阅源和 tt-rss 设置。",-1),b={href:"https://gitlab.tt-rss.org/tt-rss/tt-rss-android/-/releases",target:"_blank",rel:"noopener noreferrer"},_=s("h2",{id:"手动部署",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#手动部署","aria-hidden":"true"},"#"),e(" 手动部署")],-1),v=s("p",null,"虽然 Tiny Tiny RSS 官方建议使用 Docker 部署，但手动部署也很简单，选择适合自己的方式即可。",-1),k=s("ol",null,[s("li",null,[e("进入指定目录 "),s("code",null,"cd /www/wwwroot/"),e("。")]),s("li",null,[e("新建 rss 目录，并下载最新 tt-rss "),s("code",null,"git clone https://git.tt-rss.org/fox/tt-rss.git rss"),e("。")]),s("li",null,"打开 rss 链接，页面会出现指定要求，如：提升文件权限，删除禁用函数 passthru，安装 php 扩展-fileinfo。配置好后，重新加载 php 配置。")],-1),f={href:"https://tt-rss.org/wiki/UpdatingFeeds",target:"_blank",rel:"noopener noreferrer"},S=s("code",null,"lock/update_daemon.lock",-1),g=s("code",null,"update_daemon.stamp",-1),T={href:"https://www.cnblogs.com/imyalost/p/9801426.html",target:"_blank",rel:"noopener noreferrer"},R=c(`<ul><li>指定 PHP 版本来运行：<code>/www/server/php/74/bin/php /www/wwwroot/rss/update.php --daemon</code>。</li><li>不指定版本运行：<code>php /www/wwwroot/rss/update.php --daemon</code>。</li></ul><p>服务器使用定时任务更新 TTRSS：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">crontab</span> <span class="token parameter variable">-e</span> <span class="token comment">#进入 Cpanel 面板添加定时任务</span>
*/15 * * * * /usr/bin/php /www/wwwroot/rss/update.php <span class="token parameter variable">--feeds</span> <span class="token parameter variable">--quiet</span> <span class="token comment">#只安装了一个php</span>
*/15 * * * * /www/server/php/74/bin/php /www/wwwroot/rss/update.php <span class="token parameter variable">--feeds</span> <span class="token parameter variable">--quiet</span> <span class="token comment">#安装了多个php</span>
<span class="token comment"># 同时按下ctrl+c退出编辑模式，按下shift+: 输入wq 退出 crontab</span>
*/15 * * * *表示每隔15分钟更新一次，你可以自己改成其它的。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务器或 nginx 重启后，TTRss 会出现文件夹权限丢失，需重新设置权限。建议将此步骤设为定期任务自动执行。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> /www/wwwroot/rss/cache/images
<span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> /www/wwwroot/rss/cache/upload
<span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> /www/wwwroot/rss/cache/export
<span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> /www/wwwroot/rss/feed-icons
<span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">777</span> /www/wwwroot/rss/lock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>升级 Tiny Tiny RSS：进行 TTRSS 目录后执行升级命令 <code>git pull origin master</code>。无法升级时重命名 TTRSS 路径，全新下载后没问题再删除。数据库没变化就没事，主题重新安装。</p><h2 id="重置密码" tabindex="-1"><a class="header-anchor" href="#重置密码" aria-hidden="true">#</a> 重置密码</h2><p>如果在 Docker 容器中忘记了 ttrss 的登录密码，可使用 SSH 终端并输入以下命令，将 admin 账户的密码重置为 <code>password</code>。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> ttrss_postgres psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> ttrss <span class="token parameter variable">-c</span> <span class="token string">&quot;UPDATE ttrss_users SET pwd_hash = &#39;SHA1:5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8&#39;, salt = &#39;&#39;, otp_enabled = false WHERE login = &#39;admin&#39;;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请确保替换 <code>ttrss_postgres</code> 为 ttrss 数据库容器的实际名称，而 <code>admin</code> 则为欲重置密码的账户名称。</p>`,10);function y(x,A){const a=t("ExternalLinkIcon"),r=t("RouterLink");return l(),i("div",null,[s("p",null,[e("Tiny Tiny RSS 推荐用 "),s("a",u,[e("Awesome TTRSS"),n(a)]),e(" 的 Docker 镜像，搭建步骤参考 "),n(r,{to:"/services/NAS.html#nas-docker"},{default:p(()=>[e("NAS 上搭建 Docker")]),_:1}),e("。Awesome TTRSS 镜像不含插件「no_title_counters」，这使 TTRSS 网页标题会显示未读 RSS 数量。")]),s("ul",null,[s("li",null,[e("主题："),s("a",h,[e("feedly-sepia.css"),n(a)])]),s("li",null,[e("常见问题："),s("a",m,[e("Tiny Tiny RSS – FAQ"),n(a)])]),w,s("li",null,[e("移动端："),s("a",b,[e("Tiny Tiny RSS for Android"),n(a)]),e("。由于 Google Play 的验证折腾，作者已经放弃在 Play 上更新本应用，改为通过 CI/CD 自动构建并取消了应用收费。")])]),_,v,k,s("p",null,[e("部署完成后，需要让 TTRSS 定期更新 RSS，步骤参考 "),s("a",f,[e("Tiny Tiny RSS – Updating Feeds"),n(a)]),e("。如果遇到提示 daemon 未启动，可删除 "),S,e("和"),g,e("。")]),s("p",null,[e("阿里云"),s("a",T,[e("用非 root 账户登录远程 vnc"),n(a)]),e("，然后启动 RSS 更新 (默认 2 分钟)。远程 vnc 黑屏时，点左上角「发送远程命令」，点击菜单栏或「关机后重新启动」后不再黑屏。不用直接重启，否则报错。")]),R])}const D=o(d,[["render",y],["__file","TTRSS.html.vue"]]);export{D as default};
