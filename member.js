function skillsMember() 
{
	var member = new Array();
	var member = JSON.parse(localStorage.getItem("member"));
	var memberSkills = new Array();
	if (member != null) 
	{
		for (var i = 0; i < member.length; i++) 
		{
			memberSkills.push(member[i].skills);
		}
	}
	return memberSkills;
}
