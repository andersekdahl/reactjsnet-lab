using React;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ReactJSNET.ReactConfig), "Configure")]

namespace ReactJSNET
{
	public static class ReactConfig
	{
		public static void Configure()
		{
            ReactSiteConfiguration.Configuration
                .AddScript("~/assets/bundle.js");
		}
	}
}